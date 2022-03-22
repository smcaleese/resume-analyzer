import sys
import requests
import time
import csv
import re
import urllib.parse
from bs4 import BeautifulSoup


def find_jk_values(page, jk_value_set):
    jobmap_script_tag = page.find("script", text=lambda text: text and "jobmap" in text)
    jk_values = re.findall(r'jk:\'\w{16}\'', jobmap_script_tag.get_text())

    i = 0
    while i < len(jk_values):
        jk_value_set.add(jk_values[i][4: len(jk_values[i]) - 1])
        i += 1


def getJobData(page, dataList):
    # [ID, Company, Job Title, Location, Description,]
    company = page.findAll("div", class_="icl-u-lg-mr--sm icl-u-xs-mr--xs")[1].get_text()

    job_title = page.find("h1", class_="icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title").get_text()
    location = page.find("div",
                         class_="icl-u-xs-mt--xs icl-u-textColor--secondary jobsearch-JobInfoHeader-subtitle jobsearch-DesktopStickyContainer-subtitle").find(
        "div", class_=False).get_text()

    descriptionStrings = []
    descriptionTags = page.find_all("p")
    for tag in descriptionTags:
        descriptionStrings.append(tag.get_text())

    description = (" ".join(descriptionStrings))
    print(dataList + [company, job_title, location, description])

    return dataList + [company, job_title, location, description]

def get_jkv_values(page_url, page_number, jk_values):
    try:
        page_soup = BeautifulSoup(requests.get(page_url + "&start=" + str((page_number * 10))).content, "html.parser")
        find_jk_values(page_soup, jk_values)

        if page_soup.find('a', {"aria-label": 'Next'}):
            return 1
        else:
            return 0
    except Exception as e:
        print(e)
        print("Rate limit hit scraping page {}. Waiting 10 minute".format(page_number) )
        time.sleep(600)
        return 2

def add_job_data(csv_writer, jkv):
    try:
        job_page = BeautifulSoup(requests.get("https://www.indeed.com/viewjob?jk=" + jkv).content, "html.parser")
        if(job_page):
            csv_writer.writerow(getJobData(job_page, [jkv]))
            return True
    except Exception as e:
        print(e)
        print("Rate limit hit scraping page {}. Waiting 10 minute".format(jkv) )
        time.sleep(3600)
        return False

def scrape(page_url, csv_writer):
    # Get HTML page and convert to soup
    landing_page_soup = BeautifulSoup(requests.get(page_url).content, "html.parser")
    i = 0
    flag = 1
    jk_values = set()

    while(flag > 0):
        print(jk_values)
        flag = get_jkv_values( page_url, i, jk_values)
        if flag == 1:
            i += 1

    i = 0
    flag = True
    jkv_list = list(jk_values)
    while i < len(jkv_list):
        flag = add_job_data(csv_writer, jkv_list[i])
        if flag:
            i += 1


def main(search_term, search_location):
    # TODO:
    # Add multicoutry support https://www.indeed.com/worldwide
    # Look into adding filter=0 to request to stop job hiding
    # Fix rate limit problem
    # Issue where description is sometimes in divs and sometimes in p

    # Execute program as python indeed-jobs-scraping-script.py <Search Term> <Search Location>
    # Leave search term blank to get all jobs in a country
    # if len(sys.argv) == 3:
    #     search_term = sys.argv[1]
    #     search_location = sys.argv[2]
    # else:
    #     search_term = input("Search Term: ")
    #     search_location = input("Search Location: ")

    with open('./indeed-scraped-data-test.csv', 'w', newline='', encoding='utf-8') as f:
        # CSV writer set up
        writer = csv.writer(f)
        writer.writerow(['ID', 'Company', 'Job Title', 'Location', 'Description'])
        # Generate URL and encode characters
        page_url = urllib.parse.quote("https://ie.indeed.com/jobs?q=" + search_term + "&l=" + search_location,
                                      safe='/:?=&')
        scrape(page_url, writer)
        f.close


if __name__ == '__main__':
    main("Software Developer", "Ireland")

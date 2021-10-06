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
    company = page.find("div", class_="icl-u-lg-mr--sm icl-u-xs-mr--xs").get_text()

    job_title = page.find("h1", class_="icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title").get_text()
    location = page.find("div",
                         class_="icl-u-xs-mt--xs icl-u-textColor--secondary jobsearch-JobInfoHeader-subtitle jobsearch-DesktopStickyContainer-subtitle").find(
        "div", class_=False).get_text()

    descriptionStrings = []
    descriptionTags = page.find_all("p")
    for tag in descriptionTags:
        descriptionStrings.append(tag.get_text())

    description = (" ".join(descriptionStrings)).replace('\n', ' ').replace('\r', '')
    print(dataList + [company, job_title, location, description])

    return dataList + [company, job_title, location, description]


def scrape(page_url, csv_writer):
    # Get HTML page and convert to soup
    landing_page_soup = BeautifulSoup(requests.get(page_url).content, "html.parser")
    i = 0

    jk_values = set()
    page_soup = BeautifulSoup(requests.get(page_url + "&start=" + str((i * 10))).content, "html.parser")
    while page_soup.find('a', {"aria-label": 'Next'}):
        print(jk_values)
        # Function will go add all jk_values from page to set
        find_jk_values(page_soup, jk_values)
        # To stop captcha from appearing
        time.sleep(2)
        i += 1
        page_soup = BeautifulSoup(requests.get(page_url + "&start=" + str((i * 10))).content, "html.parser")

    for jkv in jk_values:
        print(jkv)
        job_page = BeautifulSoup(requests.get("https://www.indeed.com/viewjob?jk=" + jkv).content, "html.parser")
        # Check to make sure job listing page is returned
        if (True):
            csv_writer.writerow(getJobData(job_page, [jkv]))
        # Sleep to avoid rate limit
        time.sleep(2)


def main():
    # TODO:
    # Add multicoutry support https://www.indeed.com/worldwide
    # Look into adding filter=0 to request to stop job hiding
    # Fix rate limit problem

    # Execute program as python indeed-jobs-scraping-script.py <Search Term> <Search Location>
    # Leave search term blank to get all jobs in a country
    if len(sys.argv) == 3:
        search_term = sys.argv[1]
        search_location = sys.argv[2]
    else:
        search_term = input("Search Term: ")
        search_location = input("Search Location: ")

    with open('./indeed-scraped-data.csv', 'w') as f:

        # CSV writer set up
        writer = csv.writer(f)
        writer.writerow(['ID', 'Company', 'Job Title', 'Location', 'Description'])
        # Generate URL and encode characters
        page_url = urllib.parse.quote("https://ie.indeed.com/jobs?q=" + search_term + "&l=" + search_location,
                                      safe='/:?=&')
        scrape(page_url, writer)
        f.close


if __name__ == '__main__':
    main()

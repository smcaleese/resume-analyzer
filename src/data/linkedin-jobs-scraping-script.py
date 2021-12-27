from selenium import webdriver
import time
import pandas as pd
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException, TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# This script opens up a chrome browser

# Dependencies: command to install
# python3
# selenium: pip3 install selenium
# pandas: pip3 install pandas
# chromedriver: https://www.codegrepper.com/code-examples/python/install+chromedriver+ubuntu+python

def main():
    # Search:
    # job: 'Software Engineer', location: 'Dublin, County Dublin, Ireland':
    url = 'https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=Dublin%2C%20County%20Dublin%2C%20Ireland&geoId=105178154&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0'

    wd = webdriver.Chrome(executable_path='/usr/bin/chromedriver')
    wd.get(url)

    # scroll down the page 3 times to get 100 jobs (each page has 25 jobs):
    for _ in range(3):
        wd.execute_script('window.scrollTo(0, document.body.scrollHeight)')
        time.sleep(3)

    # Now get all the jobs
    jobs_list = wd.find_element_by_class_name('jobs-search__results-list')
    jobs = jobs_list.find_elements_by_tag_name('li')

    print('Number of jobs:', len(jobs))

    # Get the data from each job:
    job_titles = []
    company_names = []
    dates = []
    descriptions = []

    for job in jobs:
        # simple information from job list (on left side of page)
        title = job.find_element_by_class_name('base-search-card__title').get_attribute('innerText')
        company = job.find_element_by_class_name('hidden-nested-link').get_attribute('innerText')
        date = job.find_element_by_css_selector('div.base-search-card__metadata>time').get_attribute('datetime')
        job_titles.append(title)
        company_names.append(company)
        dates.append(date)

        try:
            job.click()
        except WebDriverException:
            descriptions.append('no description found')
            continue

        # if there is still no description after 3 seconds, add 'No description found' and move on
        try:
            wait  = WebDriverWait(wd, 2)
            wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'div.show-more-less-html__markup')))
            description = wd.find_element_by_css_selector('div.show-more-less-html__markup').get_attribute('innerText')
            print(f'Added new job description for {title}')
            descriptions.append(description)
        except TimeoutException:
            print('No description found')
            descriptions.append('No description found')

    # print(job_titles)
    # print(company_names)
    # print(dates)

    print('length of descriptions:', len(descriptions))

    processed_data = pd.DataFrame({
        'Company Name': company_names,
        'Job Title': job_titles,
        'Date': dates,
        'Description': descriptions,
    })

    csv = processed_data.to_csv('scraped-data.csv')

if __name__ == '__main__':
    main()

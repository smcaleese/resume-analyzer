# ResumeAnalyzer

## About

ResumeAnalyzer is a DCU Computer Science 4th year project that was created by Darragh McGonigle and Stephen McAleese.

## Description

ResumeAnalyzer is an online web application that enables software engineers to upload and analyze their resumes and learn which skills are in-demand in the job market for software engineers in Ireland.

Both features are powered by information that was acquired by analyzing and extracting insights from thousands of job posts.

<br />

![](./res/project-screenshot.png)

The resume analysis page (above) has the following features:
- **Overall resume score:** based on resume skills and length.
- **Skill frequencies panel:** shows the number of job posts matching each skill keyword.
- **Skill recommendations:** recommends skills similar to those found in the uploaded resume.
- **Matching jobs:** job posts that match the skills found in the resume.

The reports page shows information extracted from the collection of job posts to give an overview of the software engineering job market:
- **Years of experience distribution:** shows how many years of experience are typically required for roles in the tech industry.
- **Skill frequencies:** the number of job posts matching each skill keyword.
- **Job post locations:** shows which locations have the most job posts.
- **Soft skill frequencies:** shows the number of job posts that match each soft skill keyword.

The tree page contains a graph that shows several job roles in the tech industry. Clicking on each graph node shows a list of skills and job posts that match that role.

## Tech stack
- Frontend: ReactJS.
- Backend: FastAPI.
- Analysis: Python, NLTK, scikit-learn, Gensim.
- Database: PostgreSQL, SQLAlchemy.

## How to run the app locally

The app consists of a React front end application and a Python FastAPI server. The app can be run locally by running the front end and back end applications in two different terminals.

### Set up the backend

#### Database setup
The web server uses a PostgreSQL database to store job posts and other information. You need to install PostgreSQL and populate the database before you can run the web app.

1. First, you need to have PostgreSQL installed. You can install it on macOS with `brew install postgresql`.
2. Change to the `backend` directory and run `python populate_database.py` to copy the job posts and other information stored in CSV files in the `./data` directory into the PostgreSQL database.
3. Log into the PostgreSQL database with `sudo -u postgres psql` and run the `\dt` command to check that the tables were created successfully.

#### Server setup
1. Create a new virtual environment:
    - `python3 -m venv venv`
    - `source venv/bin/activate`
    - `pip install -r requirements.txt`
2. Run the server: `uvicorn server:app --reload`
3. Go to `http://127.0.0.1:8000` in the browser and check that the server is working correctly.

### Set up the frontend
The ReactJS frontend app displays the web app's user interface.

1. Open a new terminal for running the frontend web app.
2. Change to the `frontend` directory and run `yarn` to install all necessary packages.
3. Run `yarn start` to start the frontend app.
3. Go to `http://localhost:3000` in the browser and upload a resume. If everything was set up correctly, the resume should be analyzed and the results should be displayed in the browser.

### Scraping Scripts
All the scraped data needed to run the app is already stored in CSV files in the `./data` directory.

If you want new data, you can use the scraping scripts to collect new job posts and store them in CSV files.

The LinkedIn scraping script can be run with the `python3 linkedin-jobs-scraping-script.py` command and outputs scraped data to `linkedin-scraped-data.csv`.

The Indeed scraping script can be run with the `python3 indeed-jobs-scraping-script.py` command and outputs scraped data to `indeed-scraped-data.csv`.

## Note
This project was originally created in GitLab before being moved to GitHub. The original GitLab repository can be found here:
https://gitlab.computing.dcu.ie/mcgonid3/2022-ca400-mcgonid3-mcalees2.

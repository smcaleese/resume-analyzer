This sub-directory contains all source code and other program resources for the project.

## Running the App
The app consists of a React front end application and a Python FastAPI server. The app can be run locally by running the front end and back end applications in two different terminals.

### Running the Front End App

To run the front end application, open a new terminal, `cd` into the `./frontend` directory and run the following commands:

1. Install all necessary packages: `yarn`
2. Start the application: `yarn start`

### Running the Back End App (Server)

To run the back end application, open a second terminal, `cd` into the `./backend` directory and run the following commands:

1. Install all necessary packages: `pip3 install -r requirements.txt`
2. Run the server: `uvicorn server:app --reload`

For more information on FastAPI see:

https://fastapi.tiangolo.com/#installation

## Scraping Scripts
The `./data` directory contains the Indeed and LinkedIn scraping scripts which scrape jobs from Indeed and LinkedIn and save them in CSV files. 

The LinkedIn scraping script can be run with the `python3 linkedin-jobs-scraping-script.py` command and outputs scraped data to `linkin-scraped.data.csv`.

The Indeed scraping script can be run with the `python3 indeed-jobs-scraping-script.py` command and outputs scraped data to `indeed-scraped.data.csv`.

## Models
### Spacy Named Entity Recognition Models
The `./backend/models/ner-model` is a Spacy model for using NLLP to identify programming skills like lanugages, frameworks and other skills recruiters might need. Spacy is a cutting edge Python library for carrying out NLP tasks it works using a pipeline of NLP processes. Informationm about this pipeline can be found at the following [link](https://spacy.io/usage/processing-pipelines).

Our model replaces the builtin named entity recognition (NER) part of the pipeline. The model was created by using a [dataset](https://www.kaggle.com/stackoverflow/stacksample) from stackoverflow. This data was then formatted so it could be accepted by Spacy's training tool. The data was divided into a 80:20 split for training and testing and then feed into the training cycle. It took about 5 hours for the model to train.

To use the model with in the code we use a command 'nlp = spacy.load(Model_Name)' then 'doc = nlp(text)' and that will identify all programming skills within the inputted text.

Tutorials and documentation used :
[Intro to NLP with spaCy](https://www.youtube.com/watch?v=IqOJU1-_Fi0)
[spaCy Training Docs](https://spacy.io/usage/training)

## Database
For the sake of efficiency and convenience the job posts are stored in a SQL database in addition to being stored in CSV files. The `csv-to-db.py` script reads the job posts from the CSV files and inserts them into the database.

PostgreSQL is used as the SQL database and the SQLAlchemy ORM is used to interact with it.

The database can be run locally by changing `SQLALCHEMY_DATABASE_URL` to a local database with the format: `postgresql://username:password@localhost:5432/database_name`. To run the database online, replace this URL string with the URL of an online PostgreSQL server.

### PostgreSQL Setup
1. Login with the default `postgres` username: `sudo -u postgres psql`
2. Create a new database for the new user: `CREATE DATABASE new_username;`
3. Logout: `\q`
4. Create a new user: `sudo -u postgres createuser --interactive`. Note that this user must already exist in Linux.
5. Login with the new user: `sudo -u new_username psql`
6. Set user password: `ALTER USER user_name WITH PASSWORD 'new_password';`
6. Create a new database associated with that user: `CREATE DATABASE db_name;`

Databases can be managed from a terminal or using the pgAdmin4 GUI in the browser: https://www.pgadmin.org/

### Common PostgreSQL Commands
Login: `sudo -u username psql`
List all roles (users): `\dg`
List all databases: `\l`
Connect to database: `\c db_name`
List tables in database: `\dt`
Select first three rows: `SELECT * FROM job_post LIMIT 3;`
Help: `\?`
Logout: `\q`

Set up PostgreSQL on Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04
SQLAlchemy docs: https://docs.sqlalchemy.org/en/14/

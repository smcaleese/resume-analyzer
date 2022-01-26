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
The `./backend/models/ner-model` is a Spacy model for using NLLP to identify programming skills like lanugages, frameworks and other skills recruiters might need. Spacy is a cutting edge Python library for carrying out NLP tasks it works using a pipeline of NLP processes. Information about this pipeline can be found at the following [link](https://spacy.io/usage/processing-pipelines).

Our model replaces the builtin named entity recognition (NER) part of the pipeline. The model was created by using a [dataset](https://www.kaggle.com/stackoverflow/stacksample) from stackoverflow. This data was then formatted so it could be accepted by Spacy's training tool. The data was divided into a 80:20 split for training and testing and then feed into the training cycle. It took about 5 hours for the model to train.

To use the model with in the code we use a command 'nlp = spacy.load(Model_Name)' then 'doc = nlp(text)' and that will identify all programming skills within the inputted text.

Tutorials and documentation used :
[Intro to NLP with spaCy](https://www.youtube.com/watch?v=IqOJU1-_Fi0)
[spaCy Training Docs](https://spacy.io/usage/training)

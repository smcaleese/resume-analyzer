import csv
from numpy import require
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session, get_jobs_table
import models
from crud import add_job_post, delete_all_job_posts, get_all_skills
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download("stopwords")
nltk.download('punkt')

# create a function which accepts a description string and returns a space separated list of skills
def extract_reqirements(description, stop_words, skills):
    words = word_tokenize(description)
    filtered_words = []
    # nltk processing from https://realpython.com/nltk-nlp-python/
    for word in words:
        if word.casefold() not in stop_words:
            filtered_words.append(word)
    requirements = []
    for word in filtered_words:
        for skill in skills:
            if word.lower() == skill.name.lower() or (skill.altnames and word.lower() in skill.altnames):
                requirements.append(skill.name)
    print(requirements)
    return requirements

def add_to_db(db, filename):
    with open(f'../../data/{filename}', newline='') as csvfile:
        stop_words = set(stopwords.words("english"))
        skills = get_all_skills(db)
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            try:
                id, company, job_title, location, description = row
                if company.lower() == 'company':
                    continue

                requirements = extract_reqirements(description, stop_words, skills)

                # make sure only unique descriptions are added:
                description_in_db = db.query(models.JobPost).filter(models.JobPost.id == hash(description)).first()
                if description_in_db or len(description) == 0:
                    continue

                data = {
                    'id': hash(description),
                    'company': company,
                    'title': job_title,
                    'location': location,
                    'description': description,
                    'requirements': requirements if requirements else None
                }
                new_job_post = models.JobPost(**data)
                add_job_post(db, new_job_post)

            except Exception:
                continue

def main():
    db = Session()

    with db.begin():
        print('drop and create table')
        jobs_table = get_jobs_table()
        jobs_table.drop(engine, checkfirst=True)
        jobs_table.create(engine)

    add_to_db(db, 'indeed-scraped-data.csv')

    add_to_db(db, 'linkedin-scraped-data.csv')

    print('\nGetting number of rows:')
    num_rows = db.query(models.JobPost).count()
    print('\nrows inserted:', num_rows)

    db.close()

if __name__ == '__main__':
    main()

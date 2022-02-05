import csv
from numpy import require
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session, get_jobs_table
import models
import spacy
from crud import add_job_post, delete_all_job_posts

# create a function which accepts a description string and returns a space separated list of skills

def add_to_db(db, filename):
    with open(f'../../data/{filename}', newline='') as csvfile:
        nlp = spacy.load('./models/ner-model')
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            try:
                id, company, job_title, location, description = row
                if company.lower() == 'company':
                    continue

                requirements = list(set([i.text for i in nlp(job_title + '. ' + description).ents]))

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
        job_table = get_jobs_table()
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

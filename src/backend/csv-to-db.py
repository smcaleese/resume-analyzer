import csv
from numpy import require
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session
import models
import spacy
from crud import add_job_post, delete_all_job_posts
from identifiers.bag_of_words import get_skills

# create a function which accepts a description string and returns a space separated list of skills

def add_to_db(db, filename):
    with open(f'../data/{filename}', newline='') as csvfile:
        nlp = spacy.load('./models/ner-model')
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            try:
                id, company, job_title, location, description = row
                # store requirements as space-separated string eg. 'python java ruby'
                requirements = ' '.join(list(set([i.text for i in nlp(job_title + '. ' + description).ents])))

                # # make sure only job posts with unique descriptions are added:
                description_in_db = db.query(models.JobPost).filter(models.JobPost.id == hash(description)).first()
                if description_in_db or len(description) == 0:
                    continue

                data = {
                    'id': hash(description),
                    'company': company,
                    'title': job_title,
                    'location': location,
                    'description': description,
                    'requirements': requirements
                }
                new_job_post = models.JobPost(**data)
                add_job_post(db, new_job_post)

            except Exception:
                continue

def main():
    db = Session()

    with db.begin():
        print('drop and create table')
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)

    add_to_db(db, 'indeed-scraped-data.csv')

    add_to_db(db, 'linkedin-scraped-data.csv')

    print('\nGetting number of rows:')
    num_rows = db.query(models.JobPost).count()
    print('\nrows inserted:', num_rows)

    db.close()

if __name__ == '__main__':
    main()

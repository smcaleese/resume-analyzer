import csv
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session
import models
import spacy
from crud import add_job_post, delete_all_job_posts

def add_to_db(db, filename):
    with open(f'../data/{filename}', newline='') as csvfile:
        nlp = spacy.load("./models/ner-model")
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            try:
                id, company, job_title, location, description = row
                requirements = set([i.text for i in nlp(job_title + ". " + description).ents])
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
        print('Create tables if necessary')
        Base.metadata.create_all(bind=engine)

    delete_all_job_posts(db)

    add_to_db(db, 'indeed-scraped-data.csv')

    add_to_db(db, 'linkedin-scraped-data.csv')

    num_rows = db.query(models.JobPost).count()
    print('\nrows inserted:', num_rows)

    db.close()

if __name__ == '__main__':
    main()

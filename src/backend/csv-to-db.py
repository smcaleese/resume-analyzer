import csv
from database import engine, Base, Session
import models
from crud import add_job_post, delete_all_job_posts

def add_to_db(db, filename):
    with open(f'../data/{filename}', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        for row in csvreader:
            try:
                id, company, job_title, location, description = row
                data = {
                    'company': company,
                    'title': job_title,
                    'location': location,
                    'description': description
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

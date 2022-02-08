import csv
from numpy import require
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session 
from models import JobPost
from crud import add_job_post, delete_all_job_posts, get_all_skills
import nltk
from nltk.corpus import stopwords
from identifiers import extract_requirements, get_years_of_experience

nltk.download('stopwords')
nltk.download('punkt')

def add_to_db(db, filename):
    stop_words = set(stopwords.words('english'))
    skills = get_all_skills(db)

    with open(f'../data/{filename}', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        csvrows = [row for row in csvreader]

        for row in csvrows[1:]:
            try:
                id, company, title, location, description = row
                requirements = extract_requirements(description, stop_words, skills)

                # don't add if duplicate description or no description:
                description_in_db = db.query(JobPost).filter(JobPost.id == hash(description)).first()
                if description_in_db or len(description) == 0:
                    continue

                years_of_experience = get_years_of_experience(description)

                data = {
                    'id': hash(description),
                    'company': company,
                    'title': title,
                    'location': location,
                    'description': description,
                    'requirements': requirements if requirements else None,
                    'experience': years_of_experience if years_of_experience else None
                }
                new_job_post = JobPost(**data)
                add_job_post(db, new_job_post)

            except Exception:
                continue

def main():
    db = Session()

    with db.begin():
        JobPost.__table__.drop(engine, checkfirst=True)
        JobPost.__table__.create(engine)

    add_to_db(db, 'indeed-scraped-data.csv')

    add_to_db(db, 'linkedin-scraped-data.csv')

    print('\nGetting number of rows:')
    num_rows = db.query(JobPost).count()
    print('\nrows inserted:', num_rows)

    db.close()

if __name__ == '__main__':
    main()

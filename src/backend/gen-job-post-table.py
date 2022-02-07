import csv
from numpy import require
from sqlalchemy.sql.expression import desc
from database import engine, Base, Session, get_jobs_table
from models import JobPost
from crud import add_job_post, delete_all_job_posts, get_all_skills
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')

# extract all requirements from each job post and increment the skill counts in the skill table
def extract_requirements(description, stop_words, skills):
    words = word_tokenize(description)
    filtered_words = []
    # nltk processing from https://realpython.com/nltk-nlp-python/

    for word in words:
        if word.casefold() not in stop_words:
            filtered_words.append(word)

    requirements = set()
    for word in filtered_words:
        for skill in skills:
            if word.lower() == skill.name.lower() or (skill.altnames and word.lower() in skill.altnames):
                skill.count = skill.count + 1
                requirements.add(skill.name)

    return list(requirements)

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

                data = {
                    'id': hash(description),
                    'company': company,
                    'title': title,
                    'location': location,
                    'description': description,
                    'requirements': requirements if requirements else None
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

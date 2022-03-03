import csv
from database import engine, Base, Session 
from models import JobPost, Skill
from crud import add_job_post, add_skill
from identifiers import extract_requirements, get_years_of_experience
from collections import defaultdict

# get the skills data from skills.csv
def get_skills():
    skills = {}
    with open('./skills.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        csvrows = [row for row in csvreader][1:]

        for row in csvrows:
            skill_name = row[0]
            altnames = row[1][1:-1].split('|')
            skills[skill_name] = altnames if altnames[0] != '' else None

    return skills

def gather_data(filename, job_post_row_data, skill_counts, skills):
    with open(f'../data/{filename}', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        csvrows = [row for row in csvreader][1:]

        for row in csvrows:
            try:
                id, company, title, location, description = row
                # don't add if duplicate description or no description:
                row_id = hash(description)
                if row_id in job_post_row_data or len(description) == 0:
                    continue

                requirements = extract_requirements(description, skills)
                for skill_name in requirements:
                    skill_counts[skill_name] += 1

                years_of_experience = get_years_of_experience(description)

                row_data = {
                    'id': row_id,
                    'company': company,
                    'title': title,
                    'location': location,
                    'description': description,
                    'requirements': requirements if requirements else None,
                    'experience': years_of_experience if years_of_experience else None
                }
                job_post_row_data[row_id] = row_data
                print('Processed job post')

            except Exception:
                continue

def insert_job_post_rows(db, job_post_row_data):
    for i, new_row in enumerate(job_post_row_data.values()):
        new_job_post = JobPost(**new_row)
        add_job_post(db, new_job_post)
        print(f'added row {i + 1} to job_post table')

def insert_skill_rows(db, skills, skill_counts):
    row = 1
    for skill_name, altnames in skills.items():
        skill_id = hash(skill_name)
        count = skill_counts[skill_name]
        row_data = {
            'id': skill_id,
            'name': skill_name,
            'altnames': altnames if altnames else None,
            'count': count
        }
        new_row = Skill(**row_data)
        add_skill(db, new_row)
        print(f'added row {row} to skill table')
        row += 1

def drop_tables():
    JobPost.__table__.drop(engine, checkfirst=True)
    JobPost.__table__.create(engine)
    Skill.__table__.drop(engine, checkfirst=True)
    Skill.__table__.create(engine)

def main():
    db = Session()

    with db.begin():
        drop_tables()

    job_post_row_data = {}
    skill_counts = defaultdict(int)

    skills = get_skills()
    gather_data('indeed-scraped-data.csv', job_post_row_data, skill_counts, skills)
    gather_data('linkedin-scraped-data.csv', job_post_row_data, skill_counts, skills)

    insert_job_post_rows(db, job_post_row_data)
    insert_skill_rows(db, skills, skill_counts)

    print('\nInserted {} rows into job_post\n'.format(db.query(JobPost).count()))
    print('\nInserted {} rows into skill\n'.format(db.query(Skill).count()))

    db.close()

if __name__ == '__main__':
    main()

import csv
from database import engine, Session 
from models import JobPost, Skill, Rule, SoftSkill
from crud import add_job_post, add_skill, add_soft_skill, add_rule
from identifiers import extract_requirements, get_years_of_experience, get_lda, get_roles, get_rules, get_role_type
from collections import defaultdict
from sklearn.cluster import KMeans
import numpy as np
import pickle

def get_skills(filename):
    skills = {}
    with open(f'{filename}.csv', newline='') as csvfile:
        csvreader = csv.reader(csvfile, delimiter=',')
        csvrows = [row for row in csvreader][1:]

        for row in csvrows:
            skill_name = row[0]
            altnames = row[1][1:-1].split('|')
            skills[skill_name] = altnames

    return skills

def compute_roles(job_post_row_data):
    # Vectorize the job descriptions using the LDA model
    data = []
    for key in job_post_row_data.keys():
        id, description, title = job_post_row_data[key]['id'], job_post_row_data[key]['description'], job_post_row_data[key]['title']
        data.append((id, description, title))

    lda_data = get_lda(data[:])

    # an array of descriptions
    lda_vecs = np.array([x[2] for x in lda_data])

    #Train kmeans clustering model from LDA data
    kmeans = KMeans(n_clusters=19, random_state=0).fit(lda_vecs)

    #Save the model
    with open('./models/k-means-model/k-mean.pkl', 'wb') as f:
        pickle.dump(kmeans, f)
    raw_clustered_data = [[data[i][0], data[i][1], data[i][2], kmeans.labels_[i]] for i in range(len(kmeans.labels_))]
    
    clustered_data, role_map = get_roles(raw_clustered_data)

    for arr in clustered_data:
        id, description, title, role = arr
        job_post_row_data[id]['role'] = role

def compute_req_rules(job_post_row_data):
    dataset = []
    for key in job_post_row_data:
        if job_post_row_data[key]['requirements']:
            dataset.append(job_post_row_data[key]['requirements'])
    return get_rules(dataset, min_support=0.03)

def gather_data(filename, job_post_row_data, skills, skill_counts, soft_skills, soft_skill_counts, count):
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

                role_type = get_role_type(title)
                requirements = extract_requirements(description, skills)
                for skill_name in requirements:
                    skill_counts[(skill_name, role_type)] += 1

                soft_skills_found = extract_requirements(description, soft_skills)
                for skill_name in soft_skills_found:
                    soft_skill_counts[skill_name] += 1

                years_of_experience = get_years_of_experience(description)

                row_data = {
                    'id': row_id,
                    'company': company,
                    'title': title,
                    'location': location,
                    'description': description,
                    'requirements': requirements if requirements else None,
                    'experience': years_of_experience if years_of_experience else None,
                    'role': 'n/a'
                }
                job_post_row_data[row_id] = row_data
                print(f'Processed job post {count["total"]}')
                count['total'] += 1

            except Exception:
                continue

def insert_job_post_rows(db, job_post_row_data):
    for i, new_row in enumerate(job_post_row_data.values()):
        new_job_post = JobPost(**new_row)
        add_job_post(db, new_job_post)
        print(f'added row {i + 1} to the job_post table', end='\n\n')

def insert_skill_rows(db, skill_counts):
    row = 1
    for key, count in skill_counts.items():
        skill_name, role = key
        skill_id = hash(f'{skill_name}{role}')
        row_data = {
            'id': skill_id,
            'name': skill_name,
            'role': role,
            'count': count
        }
        new_row = Skill(**row_data)
        add_skill(db, new_row)
        print(f'added row {row} to the skill table', end='\n\n')
        row += 1

def insert_soft_skill_rows(db, soft_skill_counts):
    row = 1
    for skill_name, count in soft_skill_counts.items():
        skill_id = hash(skill_name)
        row_data = {
            'id': skill_id,
            'name': skill_name,
            'count': count
        }
        new_row = SoftSkill(**row_data)
        add_soft_skill(db, new_row)
        print(f'added row {row} to the soft_skills table', end='\n\n')
        row += 1

def insert_rule_rows(db, rules):
    row = 1
    for i, rule in enumerate(rules):
        row_data = {
            'id': i,
            'lhs': rule[0],
            'rhs': rule[1],
            'support': rule[2],
            'confidence': rule[3],
            'lift': rule[4]
        }
        new_row = Rule(**row_data)
        add_rule(db, new_row)
        print(f'added row {row} to the rule table', end='\n\n')
        row += 1

def drop_tables():
    JobPost.__table__.drop(engine, checkfirst=True)
    JobPost.__table__.create(engine)
    Skill.__table__.drop(engine, checkfirst=True)
    Skill.__table__.create(engine)
    SoftSkill.__table__.drop(engine, checkfirst=True)
    SoftSkill.__table__.create(engine)
    Rule.__table__.drop(engine, checkfirst=True)
    Rule.__table__.create(engine)

def main():
    db = Session()

    drop_tables()

    job_post_row_data = {}
    skill_counts = defaultdict(int)
    soft_skill_counts = defaultdict(int)

    skills = get_skills('skills')
    soft_skills = get_skills('soft-skills')

    count = {'total': 1}

    gather_data('indeed-scraped-data.csv', job_post_row_data, skills, skill_counts, soft_skills, soft_skill_counts, count)

    linkedin_csv_files = [
        'linkedin-software-engineer-ireland.csv',
        'linkedin-frontend-developer-ireland.csv',
        'linkedin-backend-developer-ireland.csv',
        'linkedin-full-stack-developer-ireland.csv',
        'linkedin-mobile-developer-ireland.csv',
        'linkedin-devops-engineer-ireland.csv',
        'linkedin-qa-engineer-ireland.csv',
        'linkedin-data-scientist-ireland.csv',
        'linkedin-machine-learning-engineer-ireland.csv'
    ]

    # for filename in linkedin_csv_files:
    #     gather_data(filename, job_post_row_data, skills, skill_counts, soft_skills, soft_skill_counts, count)

    print('Pre-computing classifications')
    compute_roles(job_post_row_data)

    print('Pre-computing association rules')
    rules = compute_req_rules(job_post_row_data)

    print('Inserting rows into database')
    insert_job_post_rows(db, job_post_row_data)
    insert_skill_rows(db, skill_counts)
    insert_soft_skill_rows(db, soft_skill_counts)
    insert_rule_rows(db, rules)

    print('\nInserted {} rows into job_post\n'.format(db.query(JobPost).count()))
    print('\nInserted {} rows into skill\n'.format(db.query(Skill).count()))
    print('\nInserted {} rows into soft_skill\n'.format(db.query(SoftSkill).count()))
    print('\nInserted {} rows into rule\n'.format(db.query(Rule).count()))

    db.close()

if __name__ == '__main__':
    main()

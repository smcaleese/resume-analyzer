from sqlalchemy.orm import Session
from sqlalchemy import Column, String
from sqlalchemy.sql import text
from models import JobPost, Skill
import schemas
from collections import defaultdict
from collections import Counter

def add_job_post(db: Session, new_job_post: schemas.JobPost):
    db.add(new_job_post)
    db.commit()
    db.refresh(new_job_post)
    return new_job_post

def get_all_job_posts(db: Session):
    print('getting all job posts', end='\n\n')
    return db.query(JobPost).distinct().all()

def delete_all_job_posts(db: Session):
    print('Deleting all job posts', end='\n\n')
    db.query(JobPost).delete()
    db.commit()

def get_ranked_job_posts(db: Session, skills: list):
    query_response = list(db.query(Column('company',String), Column('title',String), Column('description',String), Column('requirements',String), Column('skill_match',String), Column('match_count',String)).from_statement(text("""
        SELECT i.company, i.title, i.description, i.requirements, skill_match, match_count 
        FROM   job_post i
            , Lateral (
                SELECT ARRAY_AGG(uid)
                FROM   unnest(i.requirements) uid 
                WHERE  uid ILIKE ANY(ARRAY{skills})
            ) skill_match
            , Lateral (
                SELECT count(uid)
                FROM   unnest(i.requirements) uid 
                WHERE  uid ILIKE ANY(ARRAY{skills})
            ) match_count
        ORDER BY match_count DESC;""".format(skills=skills))).all())

    ranked_list = []
    for row in query_response:
        row = list(row)
        job_obj = {}
        job_obj['company'] = row[0]
        job_obj['title'] = row[1]
        job_obj['description'] = row[2]
        job_obj['requirements'] = row[3]

        skill_str = row[4][1:-1]
        if not skill_str:
            continue
        skill_str = skill_str[2:-2]
        skills_arr = skill_str.split(',')
        job_obj['skill_match'] = skills_arr

        ranked_list.append(job_obj)

    return sorted(ranked_list, key=lambda d: len(d['skill_match']) / len(d['requirements']), reverse=True) 

def add_skill(db: Session, new_skill: schemas.Skill):
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

def get_all_skills(db: Session):
    print('getting all skills', end='\n\n')
    return db.query(Skill).distinct().all()

def get_skill_counts(db):
    skill_counts = {}
    for row in db.query(Skill.name, Skill.count).all():
        name, count = row
        skill_counts[name] = count
    return skill_counts

def get_years_of_experience(db):
    years = []
    for row in db.query(JobPost.experience).all():
        years_list = row[0]
        if years_list:
            years.extend(years_list)
    years.sort()
    years_counts = [0] * (max(years) + 1)
    for num in years:
        years_counts[num] += 1

    return years_counts

def get_location_counts(db):
    locations = [x[0] for x in db.query(JobPost.location).all()]
    edited_locations = []
    for location in locations:
        edited_location = location.replace('County Dublin, ', '')
        edited_locations.append(edited_location)

    location_counts = defaultdict(int)
    for location in edited_locations:
        location_counts[location] += 1
    sorted_location_counts = sorted(location_counts.items(), key=lambda x: x[1], reverse=True)
    return sorted_location_counts 

def get_role_skills(db, role):
    reqs = []
    for job in db.query(JobPost.requirements).filter_by(role=role).all():
        if job[0]:
            reqs += job[0]
    return Counter(reqs)

def get_jobs_by_role(db, role):
    jobposts = db.query(JobPost).filter_by(role=role).all()
    return jobposts

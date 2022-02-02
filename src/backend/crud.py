from sqlalchemy.orm import Session
from sqlalchemy import Column, String
from sqlalchemy.sql import text
import models
import schemas
import collections

def add_job_post(db: Session, new_job_post: schemas.JobPost):
    db.add(new_job_post)
    db.commit()
    db.refresh(new_job_post)
    return new_job_post

def get_all_job_posts(db: Session):
    print('getting all job posts', end='\n\n')
    return db.query(models.JobPost).distinct().all()

def delete_all_job_posts(db: Session):
    print('Deleting all job posts', end='\n\n')
    db.query(models.JobPost).delete()
    db.commit()

def get_skill_counts(db):
    skill_data = db.query(models.JobPost.requirements).all()
    skill_arrays = [s[0] for s in skill_data]

    skill_counts = collections.defaultdict(int)
    for skill_array in skill_arrays:
        if skill_array:
            skill_set = set(skill_array)
            for skill in skill_set:
                skill_counts[skill] += 1
    return skill_counts

def get_ranked_job_posts(db: Session, skills: list):
    query_response = list(db.query(Column('company',String), Column('title',String), Column('skill_match',String), Column('match_count',String)).from_statement(text("""
        SELECT i.company, i.title,  skill_match, match_count 
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

        skill_str = row[2][1:-1]
        if not skill_str:
            continue
        skill_str = skill_str[2:-2]
        skills_arr = skill_str.split(',')
        if len(skills_arr) < 3:
            continue
        job_obj['skill_match'] = skills_arr

        ranked_list.append(job_obj)

    return ranked_list

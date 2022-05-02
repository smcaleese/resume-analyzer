from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from models import JobPost, Skill, SoftSkill, Rule
import schemas
from collections import defaultdict
from collections import Counter
from itertools import chain, combinations, groupby

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
    if not skills: skills = ['']
    query_response = list(db.execute(text("""
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
        ORDER BY match_count DESC;""".format(skills=skills))))

    ranked_list = []
    for row in query_response:
        row = list(row)
        job_obj = {}
        for i, s in enumerate(['company', 'title', 'description', 'requirements']):
            job_obj[s] = row[i]
        skill_str = row[4][1:-1]
        if not skill_str:
            continue
        skill_str = skill_str[2:-2]
        skills_arr = skill_str.split(',')
        job_obj['skill_match'] = skills_arr
        ranked_list.append(job_obj)

    return sorted(ranked_list, key=lambda x: len(x['skill_match']) / len(x['requirements']), reverse=True) 

def add_skill(db: Session, new_skill: schemas.Skill):
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

def add_soft_skill(db: Session, new_soft_skill: schemas.SoftSkill):
    db.add(new_soft_skill)
    db.commit()
    db.refresh(new_soft_skill)
    return new_soft_skill

def add_rule(db: Session, new_rule: schemas.Rule):
    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)
    return new_rule

def get_all_skills(db: Session):
    print('getting all skills', end='\n\n')
    return db.query(Skill).distinct().all()

roles = {'software', 'frontend', 'backend', 'fullstack', 'mobile', 'devops', 'qa', 'ds', 'ml', 'all'}

def get_skill_counts(db):
    skill_counts = defaultdict(dict)
    db_rows = db.query(Skill.name, Skill.role, Skill.count).all()
    for row in db_rows:
        name, role, count = row
        if role in roles:
            skill_counts[role][name] = count
        else:
            skill_counts['other'][name] = count
    for row in groupby(sorted(db_rows), lambda x: x[0]):
        name, groups = row
        count = 0
        for group in groups:
            count += group[2]
        skill_counts['all'][name] = count
    return skill_counts 

def get_soft_soft_skill_counts(db):
    soft_skill_counts = {}
    for row in db.query(SoftSkill.name, SoftSkill.count).all():
        name, count = row
        soft_skill_counts[name] = count
    return soft_skill_counts 

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
    return location_counts 

def get_role_skills(db, role):
    reqs = []
    for job in db.query(JobPost.requirements).filter_by(role=role).all():
        if job[0]:
            reqs += job[0]
    return Counter(reqs)

def get_jobs_by_role(db, role):
    jobposts = db.query(JobPost).filter_by(role=role).all()
    return jobposts

def get_ranked_recommendations(db, resume_skill_names):
    longest_lhs = len(db.query(Rule.lhs).order_by(text("array_length(lhs, 1) DESC")).first()[0])
    sub_lists = list(chain(*(combinations(resume_skill_names, i) for i in range(1, longest_lhs + 1))))

    db_data = db.query(Rule).all()
    table = {}
    for row in db_data:
        lhs_key = tuple(row.lhs)
        if lhs_key not in table:
            table[lhs_key] = {
                'rhs': [],
                'lift': [],
                'support': [] 
            } 
        for s in ['rhs', 'lift', 'support']:
            table[lhs_key][s].append(row.__dict__[s])

    matches = []
    for comb in sub_lists:
        if comb in table:
            rhs, lift, support = table[comb]['rhs'], table[comb]['lift'], table[comb]['support']
            for i, skill in enumerate(rhs):
                if skill not in set(resume_skill_names):
                    matches.append({'lhs': comb, 'rhs': skill, 'lift': lift[i], 'support': support[i]})

    matches.sort(key=lambda x: (x['lift'], x['support']), reverse=True)
    return matches[:10]

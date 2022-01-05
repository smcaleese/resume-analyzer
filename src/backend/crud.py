'''
from sqlalchemy.orm import Session
from . import models, schemas

def add_job_post(db: Session, job_post: schemas.JobPost):
    new_job_post = models.JobPost(id = job_post.id, company = job_post.company, location = job_post.location, description = job_post.description)
    db.add(new_job_post)
    db.commit()
    db.refresh(new_job_post)
    return new_job_post

def get_all_job_posts(db: Session):
    return db.query(models.JobPost).all()

# def get_job_post_by_id(db: Session, job_post_id: int):
#     return db.query(models.JobPost).filter(models.JobPost.id == job_post_id).first()
'''
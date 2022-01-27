from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy
from database import engine, Base, Session
import models
from crud import add_job_post, delete_all_job_posts, get_all_job_posts
import uvicorn

# Set up app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/status')
async def status():
    return { 'message': 'Server is running' }

def get_skill_counts():
    db = Session()
    skill_strings_tuples_arr = db.query(models.JobPost.requirements).all()
    skill_strings_arr = [s[0] for s in skill_strings_tuples_arr]
    db.close()

    skill_counts = {} 
    for skill_string in skill_strings_arr:
        skills = skill_string.split()
        for skill in skills:
            if skill not in skill_counts:
                skill_counts[skill] = 1
            else:
                skill_counts[skill] += 1
    return skill_counts

@app.post('/resume-upload')
def handle_upload(file: UploadFile = File(...)):
    skill_counts = get_skill_counts()
    print('skill counts:')
    print(skill_counts)

    with pdfplumber.open(file.file) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
    
        # get skills in resume
        nlp = spacy.load('./models/ner-model')
        doc = nlp(' '.join(pages))
        ents = doc.ents
        skills = []
        for skill in ents:
            skills.append({ 'name': skill.text, 'start': skill.start, 'end': skill.end })

    return { 'pages': pages, 'skills': skills, 'skill_counts': skill_counts }

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

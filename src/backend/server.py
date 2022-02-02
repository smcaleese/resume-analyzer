from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy
from database import engine, Base, Session
import models
from crud import get_skill_counts, get_ranked_job_posts
import uvicorn
import colorsys
from math import floor

# Set up app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://fourth-year-project-front-end.herokuapp.com'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Helper functions
def gen_skill_colors(skills):
    hsv_skill_colors = [(x*1.0/len(skills), 1, 1) for x in range(len(skills))]
    rgb_skill_colors = [colorsys.hsv_to_rgb(*x) for x in hsv_skill_colors]
    encoded_rgb_skill_colors = []
    for color in rgb_skill_colors:
        new_color = []
        for channel in color:
            new_color.append(floor(channel*255))
        color_string = ','.join(str(x) for x in new_color)
        encoded_rgb_skill_colors.append(color_string)
    return encoded_rgb_skill_colors

def get_skills_from_ents(ents):
    skill_set = set()
    for ent in ents:
        skill_set.add(ent.text)
    skills = []
    skill_colors = gen_skill_colors(skill_set) 
    for idx, skill in enumerate(skill_set):
        skills.append({'name': skill, 'color': skill_colors[idx]})
    return skills

# Routes
@app.get('/status')
async def status():
    return { 'message': 'Server is running' }

@app.post('/resume-upload')
def handle_upload(file: UploadFile = File(...)):
    db = Session()
    skill_counts = get_skill_counts(db)

    with pdfplumber.open(file.file) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
    
        # get skills in resume
        nlp = spacy.load('./models/ner-model')
        doc = nlp(' '.join(pages))
        ents = doc.ents
        print('ents:', ents)
        skills = get_skills_from_ents(ents)
        skill_names = [skill['name'] for skill in skills]
        jobs = get_ranked_job_posts(db, skill_names)

    db.close()

    return { 'pages': pages, 'skills': skills, 'skill_counts': skill_counts, 'jobs': jobs }

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

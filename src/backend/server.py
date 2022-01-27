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
import colorsys
from math import floor

# Set up app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Functions
def get_skill_counts():
    db = Session()
    skill_strings_tuples_arr = db.query(models.JobPost.requirements).all()
    skill_strings_arr = [s[0] for s in skill_strings_tuples_arr]
    db.close()

    skill_counts = {} 
    for skill_string in skill_strings_arr:
        skills = skill_string
        if skills:
            for skill in skills:
                if skill not in skill_counts:
                    skill_counts[skill] = 1
                else:
                    skill_counts[skill] += 1
    return skill_counts

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


# Routes
@app.get('/status')
async def status():
    return { 'message': 'Server is running' }

@app.post('/resume-upload')
def handle_upload(file: UploadFile = File(...)):
    skill_counts = get_skill_counts()

    with pdfplumber.open(file.file) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
    
        # get skills in resume
        nlp = spacy.load('./models/ner-model')
        doc = nlp(' '.join(pages))
        ents = doc.ents
        skill_set = set()
        for ent in ents:
            skill_set.add(ent.text)
        skills = []
        skill_colors = gen_skill_colors(skill_set) 
        for idx, skill in enumerate(skill_set):
            skills.append({'name':skill, 'color': skill_colors[idx]})

    return { 'pages': pages, 'skills': skills, 'skill_counts': skill_counts }

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

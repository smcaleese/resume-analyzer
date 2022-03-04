from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from numpy import extract
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy
from database import engine, Base, Session
import models as mdoels
from crud import get_skill_counts, get_ranked_job_posts, get_all_skills, get_years_of_experience
import uvicorn
import colorsys
from math import floor
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download('stopwords')
nltk.download('punkt')

# Set up app
app = FastAPI()

origins = [
    'http://localhost:3000',
    'https://fourth-year-project-front-end.herokuapp.com',
    'http://www.resumeanalyzer.xyz'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Helper functions
def gen_skill_colors(skills):
    hsv_skill_colors = [(x*1.0/len(skills), 0.8, 1) for x in range(len(skills))]
    rgb_skill_colors = [colorsys.hsv_to_rgb(*x) for x in hsv_skill_colors]
    encoded_rgb_skill_colors = []

    for color in rgb_skill_colors:
        new_color = []
        for channel in color:
            new_color.append(floor(channel*255))
        color_string = ','.join(str(x) for x in new_color)
        encoded_rgb_skill_colors.append(color_string)

    return encoded_rgb_skill_colors

def extract_skills(text, db):
    stop_words = set(stopwords.words('english'))
    skill_list = get_all_skills(db)
    
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.casefold() not in stop_words]

    skills = set()
    for word in filtered_words:
        for skill in skill_list:
            if word.lower() == skill.name.lower() or (skill.altnames and word.lower() in skill.altnames):
                skills.add(skill.name)

    skill_names = list(skills)
    skill_colors = gen_skill_colors(skill_names) 

    skill_items = []
    for idx, skill in enumerate(skill_names):
        skill_items.append({'name': skill, 'color': skill_colors[idx]})
        
    return skill_items

# Routes
@app.get('/status')
async def status():
    return { 'message': 'Server is running' }

@app.post('/resume-upload')
def handle_upload(file: UploadFile = File(...)):
    db = Session()
    print('find all skills:')

    skill_counts = get_skill_counts(db)

    years_of_experience_counts = get_years_of_experience(db)

    with pdfplumber.open(file.file) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
    
        # get skills in resume
        skills = extract_skills(' '.join(pages), db)
        skill_names = [skill['name'] for skill in skills]
        jobs = get_ranked_job_posts(db, skill_names)

    db.close()

    response = {
        'skills': skills,
        'skill_counts': skill_counts,
        'jobs': jobs,
        'years_of_experience_counts': years_of_experience_counts
    }

    return response

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from database import Session
from crud import get_skill_counts, get_ranked_job_posts, get_soft_soft_skill_counts, get_years_of_experience, get_location_counts, get_role_skills, get_jobs_by_role, get_ranked_recommendations, roles
from populate_database import get_skills
import uvicorn
import colorsys
from math import floor
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import math
import numpy as np

nltk.download('stopwords')
nltk.download('punkt')

# Set up app
app = FastAPI()

origins = [
    'http://localhost:3000',
    'https://master.d2uonl6yzgb9hq.amplifyapp.com',
    'https://www.resumeanalyzer.xyz',
    'https://resumeanalyzer.xyz'
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
    hsv_skill_colors = [(x*1.0/len(skills), 0.6, .9) for x in range(len(skills))]
    rgb_skill_colors = [colorsys.hsv_to_rgb(*x) for x in hsv_skill_colors]
    encoded_rgb_skill_colors = []

    for color in rgb_skill_colors:
        new_color = []
        for channel in color:
            new_color.append(floor(channel*255))
        color_string = ','.join(str(x) for x in new_color)
        encoded_rgb_skill_colors.append(color_string)

    return encoded_rgb_skill_colors

def extract_resume_skills(text):
    stop_words = set(stopwords.words('english'))
    all_skills = get_skills('skills')
    
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.casefold() not in stop_words]
    filtered_words.extend([word for word in text.split() if word.casefold() not in stop_words])

    skills = set()
    for word in filtered_words:
        for skill in all_skills:
            altnames = all_skills[skill]
            if word.lower() == skill.lower() or (altnames and word.lower() in altnames):
                skills.add(skill)

    skill_names_found = list(skills)
    skill_colors = gen_skill_colors(skill_names_found) 

    skill_items = []
    for idx, skill in enumerate(skill_names_found):
        skill_items.append({'name': skill, 'color': skill_colors[idx]})
        
    return skill_items

def calculate_resume_score(skill_counts, resume_skills, resume_text):
    def calculate_skill_scores(resume_skills, skill_counts):
        skill_scores = {}
        for role in roles:
            role_skill_counts = [x for x in skill_counts[role].values()]
            average_skill_count = np.mean(role_skill_counts)
            score = 0
            for skill in resume_skills:
                skill_name = skill['name']
                skill_count = skill_counts[role][skill_name] if skill_name in skill_counts[role] else 0
                weight = skill_count / average_skill_count
                score += weight
            normalized_skill_score = math.tanh(score * 0.025) * 100
            skill_scores[role] = round(normalized_skill_score)
        return skill_scores 

    def calculate_length_score(resume_text):
        word_count = len(resume_text.split())
        # calculate the length score using a normal distribution of the word count
        b = 500  # mean of curve
        c = 250  # standard deviation
        # produce a value between 0.0 and 1.0 based on the word count
        standard_deviation_function = lambda x: math.e ** (-(x - b)**2 / (2 * c**2))
        length_score = standard_deviation_function(word_count) * 100
        return round(length_score)

    skill_scores = calculate_skill_scores(resume_skills, skill_counts)
    length_score = calculate_length_score(resume_text)
    overall_scores = {}
    for role in roles:
        overall_scores[role] = round(np.average([skill_scores[role], length_score], weights=[2,1]))

    return {
        'overall_scores': overall_scores,
        'skill_scores': skill_scores,
        'length_score': length_score
    }

# Routes
@app.get('/')
async def status():
    return { 'status': 'ok' }

@app.post('/resume-upload')
async def handle_upload(file: UploadFile = File(...)):
    db = Session()
    print('find all skills:')

    skill_counts = get_skill_counts(db)

    with pdfplumber.open(file.file) as pdf:
        pages = []
        for page in pdf.pages:
            pages.append(page.extract_text())
    
        # get skills in resume
        resume_text = ' '.join(pages)
        resume_skills = extract_resume_skills(resume_text)
        skill_names = [skill['name'] for skill in resume_skills]
        recommendations = get_ranked_recommendations(db, skill_names)
        jobs = get_ranked_job_posts(db, skill_names)

    db.close()

    resume_score = calculate_resume_score(skill_counts, resume_skills, resume_text)

    response = {
        'skills': resume_skills,
        'recommendations': recommendations,
        'skill_counts': skill_counts,
        'jobs': jobs,
        'resume_score': resume_score
    }

    return response

@app.get('/path-data')
async def get_path_data():
    db = Session()

    roles = [
        'Junior Frontend Developer',
        'Senior Frontend Developer',
        'Junior Backend Developer',
        'Senior Backend Developer',
        'Junior Full Stack Developer',
        'Full Stack Developer',
        'Senior Full Stack Developer',
        'QA Engineer',              
        'Senior QA Engineer',
        'Business Analyst',      
        'Development Lead',  
        'Software Architect',
        'Product Owner',              
        'Project Manager',    
        'Devops',              
        'Senior Devops',              
        'Automation Engineer',
        'Cloud Engineer',              
        'Database Admin (DBA)'
    ]

    response = {}
    for role in roles:
        response[role] = get_role_skills(db, role)
    db.close()

    return response

@app.get('/job-data-by-role')
async def get_job_data_by_role(role_type: str = ""):
    db = Session()
    response = {
        'jobs': get_jobs_by_role(db, role_type)
    }
    db.close()

    return response

@app.get('/report-data')
async def get_report_data():
    db = Session()
    response = {
        'skill_counts': get_skill_counts(db),
        'soft_skill_counts': get_soft_soft_skill_counts(db),
        'years_of_experience_counts': get_years_of_experience(db),
        'location_counts': get_location_counts(db) 
    }
    db.close()
    return response

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

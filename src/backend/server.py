from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import spacy
from database import engine, Base, Session
from crud import get_skill_counts, get_ranked_job_posts, get_years_of_experience, get_location_counts, get_role_skills, get_jobs_by_role
from populate_database import get_skills
import uvicorn
import colorsys
from math import floor
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import sklearn
import pickle
from identifiers import vectorize_text

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

def extract_skills(text):
    stop_words = set(stopwords.words('english'))
    all_skills = get_skills()
    
    words = word_tokenize(text)
    filtered_words = [word for word in words if word.casefold() not in stop_words]

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
        skills = extract_skills(' '.join(pages))
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

@app.get('/path-data')
def get_path_data():
    db = Session()

    #Classify users role
    # lda_vec = vectorize_text(" ".join(pages)).reshape(1,-1)
    # with open('./models/k-means-model/k-mean.pkl', 'rb') as f:
    #     kmeans_model=pickle.load(f)
    # role = int(kmeans_model.predict(lda_vec)[0])

    db.close()

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
        response[role] = get_jobs_by_role(db, role)

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
def get_report_data():
    db = Session()
    response = {
        'skill_counts': get_skill_counts(db),
        'years_of_experience_counts': get_years_of_experience(db),
        'location_counts': get_location_counts(db) 
    }
    db.close()

    return response

if __name__ == '__main__':
    uvicorn.run('server:app', host='127.0.0.1', port=8000, log_level='info')

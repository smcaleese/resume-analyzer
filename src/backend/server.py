from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy
from database import engine, Base, Session
import models
from crud import add_job_post, delete_all_job_posts, get_all_job_posts

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
    return {'message': 'Server is running'}

@app.post('/resume-upload')
def handle_upload(file: UploadFile = File(...)):
    print('filename:', file.filename)

    with pdfplumber.open(file.file) as pdf:
        content = []
        for page in pdf.pages:
            content.append(page.extract_text())
    
        nlp = spacy.load("./models/ner-model")
        doc = nlp(" ".join(content))
        ents = doc.ents
        skills=[]
        for skill in ents:
            skills.append({'skill':{'name':skill.text, 'start': skill.start, 'end': skill.end}})

    return {'content': content, 'skills': skills}

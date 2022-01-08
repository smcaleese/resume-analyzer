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
        first_page = pdf.pages[0]
        first_page_content = first_page.extract_text()
        print('printing PDF:', end='\n')
        print(first_page_content)
    
        nlp = spacy.load("./models/ner-model")
        doc = nlp(first_page_content)
        skills = doc.ents
        print('skills:', skills)

    return {'content': first_page_content}

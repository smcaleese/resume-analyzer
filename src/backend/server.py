from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('status')
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

        doc = nlp(first_page.extract_text())

        print(doc.ents)

    return {'content': first_page_content}

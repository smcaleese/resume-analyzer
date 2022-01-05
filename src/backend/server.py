from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pdfplumber
import spacy
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Set up database
SQLALCHEMY_DATABASE_URL = 'postgresql://stephen:mcaleese@localhost:5432/db'
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
Session = sessionmaker(bind=engine)
db = Session()

Base = declarative_base()

class JobPost(Base):
    __tablename__ = 'job_post'
    id = Column(Integer, primary_key=True)
    company = Column(String)
    job_title = Column(String)
    location = Column(String)
    description = Column(String)

    def __repr__(self):
        return '<JobPost id={} company={} job_title={} location={} description={}>' \
                .format(self.id, self.company, self.job_title, self.location, self.description)

Base.metadata.create_all(engine)

# Add information
print('Adding info...')
new_job_post = JobPost(id = '1', company = 'Google', job_title = 'Software Engineer', location = 'Dublin', description = 'NA')
db.add(new_job_post)

# Query the information
print('Querying db...')
all_job_posts = db.query(JobPost).all()
print('all_job_posts:', all_job_posts)

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
        doc = nlp(first_page_content)
        skills = doc.ents
        print('skills:', skills)

    return {'content': first_page_content}

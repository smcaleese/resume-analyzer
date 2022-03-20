from nltk.tokenize import word_tokenize
from numpy import number
import spacy
from spacy.matcher import Matcher
from database import Session
from crud import get_all_job_posts
from models import JobPost
import string
import nltk
from nltk.corpus import stopwords
from database import Session
import re
import pickle
import gensim
from gensim import models as gm
import sklearn
import pickle
import numpy as np

nltk.download('stopwords')
nltk.download('punkt')

lda_stop_words = stopwords.words('english')
lda_stop_words.extend(['from', 'subject', 're', 'edu', 'use', 'experience', 'team', 'software', 'development', 'work', 'environment', 'working', 'opportunity'])

# extract all requirements from each job post and increment the skill counts in the skill table
def extract_requirements(description, skills):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(description)
    potential_skill_words = []
    # nltk processing from https://realpython.com/nltk-nlp-python/

    for word in words:
        if word.casefold() not in stop_words:
            potential_skill_words.append(word)

    requirements = set()
    for word in potential_skill_words:
        for skill, altnames in skills.items():
            if word.lower() == skill.lower() or (altnames and word.lower() in altnames):
                requirements.add(skill)

    return list(requirements)

# make all chars lowercase, remove punctuation and unnecessary spaces
def normalize_text(text):
    text = text.strip()
    special_chars = string.punctuation + '’'
    cleaned_text = ''.join([char.lower() if char not in special_chars else ' ' for char in text])
    normalized_text = ' '.join(cleaned_text.split())
    return normalized_text

# find the years of experience required in each job post description using regular expressions
def get_years_of_experience(description):
    normalized_description = normalize_text(description)

    # 1+ words, 1 or 2 digit number, years, 0-10 words, experience e.g. 3 years of experience
    number_expression = r'(([a-z]+\s){1,10}[0-9]{1,2}\s(year|years)([a-z]*\s){0,10}experience)+'
    # match range from normalized text, e.g. 3-5 years of experience -> 3 5 years of experience
    range_expression = r'(([a-z]+\s){1,10}[0-9]\s[0-9]\syears([a-z]*\s){0,10}experience)+'

    number_match = re.search(number_expression, normalized_description)
    range_match = re.search(range_expression, normalized_description)

    years = []
    if number_match:
        number_match_string = number_match.group()
        years_found = [int(token) for token in number_match_string.split() if token.isdigit() and int(token) < 20]
        years.extend(years_found)

    if range_match:
        range_match_string = range_match.group()
        years_found = [int(token) for token in range_match_string.split() if token.isdigit() and int(token) < 20]
        if years_found:
            average_years = sum(years_found) / len(years_found)
            years.append(round(average_years))

    return years

# based on https://towardsdatascience.com/unsupervised-nlp-topic-models-as-a-supervised-learning-input-cf8ee9e5cf28
# find the type of job posting using nlp and ml e.g. frontend, devops, qa
def get_lda(id_descs):
    # Load corpus data
    with open('./models/lda-model/data/train_corpus.pkl', 'rb') as f:
        corpus=pickle.load(f)
    with open('./models/lda-model/data/train_id2word.pkl', 'rb') as f:
        id2word=pickle.load(f)
    
    #Load LDA Model
    lda_model =  gm.LdaModel.load('./models/lda-model/lda_train.model')

    for i in range(len(id_descs)):
        ident, desc = id_descs[i]
        #Tokenize description
        processed_desc = gensim.utils.simple_preprocess(str(desc), deacc=True)
        processed_desc = [word for word in processed_desc if word not in lda_stop_words]
        token_desc = id2word.doc2bow(processed_desc)
    
        #Vectorize description using lda model
        top_topics = lda_model.get_document_topics(token_desc, minimum_probability=0.0)
        topic_vec = [top_topics[i][1] for i in range(17)]
        topic_vec = np.array(topic_vec)

        id_descs[i] = [ident, desc, topic_vec]
    return id_descs


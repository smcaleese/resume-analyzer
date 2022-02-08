from nltk.tokenize import word_tokenize
import spacy
from spacy.matcher import Matcher
from database import Session
from crud import get_all_job_posts
from models import JobPost
from string import punctuation

# extract all requirements from each job post and increment the skill counts in the skill table
def extract_requirements(description, stop_words, skills):
    words = word_tokenize(description)
    filtered_words = []
    # nltk processing from https://realpython.com/nltk-nlp-python/

    for word in words:
        if word.casefold() not in stop_words:
            filtered_words.append(word)

    requirements = set()
    for word in filtered_words:
        for skill in skills:
            if word.lower() == skill.name.lower() or (skill.altnames and word.lower() in skill.altnames):
                skill.count = skill.count + 1
                requirements.add(skill.name)

    return list(requirements)

def normalize_text(text):
    special_chars = punctuation + '’'
    cleaned_text = ''.join([char if char not in special_chars else ' ' for char in text])
    normalized_text = ' '.join(cleaned_text.split())
    return normalized_text

def get_years_of_experience(description):
    nlp = spacy.load("en_core_web_sm")
    matcher = Matcher(nlp.vocab)

    pattern = [
        {"IS_DIGIT": True, "OP": "?"},
        {"IS_DIGIT": True},
        {"TEXT": "+", "OP": "?"},
        {"LOWER": "years"},
        {"LOWER": "of", "OP": "?"},
        {"IS_ALPHA": True, "OP": "?"},
        {"IS_ALPHA": True, "OP": "?"},
        {"IS_ALPHA": True, "OP": "?"},
        {"LOWER": "experience"}
    ]

    matcher.add("PATTERN", [pattern])

    normalized_description = normalize_text(description)

    doc = nlp(normalized_description) 
    matches = matcher(doc)
    
    years = []
    for match_id, start, end in matches:
        match = doc[start:end].text
        match_words = match.split()
        num = [w for w in match_words if w.isdigit()]
        if num:
            num = int(num[0])
            if num <= 20:
                years.append(num)

    if years:
        # add average number of years required in job post eg. 2-5 years -> 3.5 years
        average = round(sum(years) / len(years), 2)
        rounded_average = round(average, 2)
        return rounded_average

    return None

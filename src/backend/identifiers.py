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

# nltk.download('stopwords')
# nltk.download('punkt')

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

'''
if __name__ == '__main__':
    db = Session()
    all_descriptions = [tup[0] for tup in db.query(JobPost.description).all()]
    years_of_experience = []

    for description in all_descriptions:
        years = get_years_of_experience(description)
        if years:
            for year in years:
                years_of_experience.append(year)

    for year in years_of_experience:
        print('year:', year)

    db.close()

    print('len:', len(years_of_experience), len(all_descriptions))

    recall = len(years_of_experience) / len(all_descriptions)

    print('recall:', recall)
    # # years = []
    # with open('../data/years-of-experience-phrases.txt', 'r') as file:
    #     lines = file.readlines()

    #     with open('../data/normalized-phrases.txt', 'w') as f2:
    #         for line in lines:
    #             normalized_line = normalize_text(line)
    #             f2.write(normalized_line + '\n')

    # for line in lines:
    #     years = get_years_of_experience(line)
    #     print('line:', line.strip())
    #     print('years:', years)
    #     print()
'''

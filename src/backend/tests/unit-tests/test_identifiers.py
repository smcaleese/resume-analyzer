import unittest
import sys
sys.path.append('../../')
from database import Session
from identifiers import extract_requirements, normalize_text, get_years_of_experience, vectorize_text, get_lda, get_rules
from populate_database import get_skills
import pdfplumber
import os
import json

with open('./test_data.json') as json_file:
    test_data = json.load(json_file)['test_data']

class TestIdentifiers(unittest.TestCase):
    def test_extract_requirements(self):
        os.chdir('../../')
        skills = get_skills('skills')

        for obj in test_data:
            description = obj['description']
            actual = extract_requirements(description, skills)
            expected = obj['expected_requirements']
            self.assertEqual(sorted(expected), sorted(actual))

    def test_normalize_text(self):
        # check that the description only contains letters and numbers
        for obj in test_data:
            description = obj['description']
            normalized_description = normalize_text(description)
            for char in normalized_description:
                self.assertTrue(char == ' ' or char.isalnum())

    def test_get_years_of_experience(self):
        for obj in test_data:
            description = obj['description']
            actual = get_years_of_experience(description)
            expected = obj['expected_years_of_experience']
            self.assertEqual(expected, actual)
    
    def test_vectorize_text(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume.pdf') as pdf:
            pages1 = [page.extract_text() for page in pdf.pages]
        with pdfplumber.open('../test-resume2.pdf') as pdf:
            pages2 = [page.extract_text() for page in pdf.pages]
        os.chdir('../../')

        text = ' '.join(pages1)
        vec = vectorize_text(text)
        self.assertEqual(len(vec), 17)
        
        text = ' '.join(pages2)
        vec = vectorize_text(text)
        self.assertEqual(len(vec), 17)
    
    def test_get_lda(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume.pdf') as pdf:
            pages1 = [page.extract_text() for page in pdf.pages]
        with pdfplumber.open('../test-resume2.pdf') as pdf:
            pages2 = [page.extract_text() for page in pdf.pages]
        os.chdir('../../')

        data = [
            [1, ' '.join(pages1)], [2, ' '.join(pages2)]
        ]
        lda = get_lda(data)
        self.assertEqual(lda[0][0], 1)
        self.assertEqual(lda[1][0], 2)

        self.assertEqual(lda[0][1], ' '.join(pages1))
        self.assertEqual(lda[1][1], ' '.join(pages2))

        self.assertEqual(len(lda[0][2]), 17)
        self.assertEqual(len(lda[1][2]), 17)
    
    def test_get_rules(self):
        dummy_transactions = [
            ["Java", "Python", 'Spring'], 
            ["Java", "Python"],
            ["CSS", "HTML"],
            ["CSS", "HTML", "ReactJS"]
            ]
        
        rules = get_rules(dummy_transactions)
        dummy_rule1 = [['HTML'], 'CSS', 0.5, 1.0, 2.0]
        dummy_rule2 = [['CSS'], 'HTML', 0.5, 1.0, 2.0]

        self.assertTrue(rules[0] == dummy_rule1 or rules[0] == dummy_rule2)

if __name__ == '__main__':
    unittest.main()

import unittest
import sys
import json
sys.path.append('../../')
from server import gen_skill_colors
from server import extract_resume_skills
from server import calculate_resume_score
import pdfplumber
import os

class TestServer(unittest.TestCase):
    def test_gen_skill_colors_1(self):
        skills = ['Java', 'Python', 'SQL']
        expected = ['229,91,91', '91,229,91', '91,91,229']
        actual = gen_skill_colors(skills)
        self.assertEqual(expected, actual)
    
    def test_gen_skill_colors_2(self):
        skills = ['Java', 'AWS', 'React', 'Node', 'HTML', 'CSS']
        expected = ['229,91,91', '229,229,91', '91,229,91', '91,229,229', '91,91,229', '229,91,229']
        actual = gen_skill_colors(skills)
        self.assertEqual(expected, actual)

    def test_extract_skills_1(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume.pdf') as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        os.chdir('../../')
        skill_items = extract_resume_skills(' '.join(pages))
        actual_skill_names = [skill['name'] for skill in skill_items]
        expected_skill_names = ['Python', 'JavaScript', 'ReactJS', 'Java']
        self.assertEqual(set(expected_skill_names), set(actual_skill_names))
    
    def test_extract_skills_2(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume2.pdf') as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        os.chdir('../../')
        skill_items = extract_resume_skills(' '.join(pages))
        actual_skill_names = [skill['name'] for skill in skill_items]
        expected_skill_names = ['JavaScript', 'ReactJS', 'Java', 'JIRA', 'HTML', 'CSS', 'PostgreSQL', 'Spring']
        self.assertEqual(set(expected_skill_names), set(actual_skill_names))
    
    def test_calculate_resume_score(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume.pdf') as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        with open('./test_data.json') as json_data:
            data = json.load(json_data)
            skill_counts = data["dummy_counts"]
        os.chdir('../../')

        resume_text = ' '.join(pages)
        skills = [{'name': 'Python'}, {'name': 'JavaScript'}, {'name': 'ReactJS'}, {'name': 'Java'}]
        
        actual_resume_score = calculate_resume_score(skill_counts, skills, resume_text)
        expected_resume_score = {'overall_score': 40, 'skill_score': 60, 'length_score': 0}
        self.assertEqual(expected_resume_score, actual_resume_score)
    
    def test_calculate_resume_score_2(self):
        os.chdir('tests/unit-tests')
        with pdfplumber.open('../test-resume2.pdf') as pdf:
            pages = [page.extract_text() for page in pdf.pages]
        with open('./test_data.json') as json_data:
            data = json.load(json_data)
            skill_counts = data["dummy_counts"]
        os.chdir('../../')

        resume_text = ' '.join(pages)
        skills = [{'name': 'Python'}, {'name': 'JavaScript'}, {'name': 'ReactJS'}, {'name': 'Java'}, {'name': 'AWS'}]
        
        actual_resume_score = calculate_resume_score(skill_counts, skills, resume_text)
        expected_resume_score = {'overall_score': 48, 'skill_score': 71, 'length_score': 3}
        self.assertEqual(expected_resume_score, actual_resume_score)


if __name__ == '__main__':
    unittest.main()

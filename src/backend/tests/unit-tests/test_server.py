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
        expected_resume_score = {
            'overall_scores': {'frontend': 37, 'ds': 27, 'ml': 17, 'fullstack': 33, 'qa': 25, 'backend': 21, 'devops': 20, 'mobile': 24, 'software': 41, 'all': 44},
            'skill_scores': {'frontend': 47, 'ds': 32, 'ml': 18, 'fullstack': 41, 'qa': 30, 'backend': 24, 'devops': 22, 'mobile': 28, 'software': 54, 'all': 58},
            'length_score': 16
        }
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

        print('length score:', actual_resume_score['length_score'])

        expected_resume_score = {
            'overall_scores': {'qa': 38, 'backend': 40, 'mobile': 34, 'frontend': 49, 'ml': 32, 'fullstack': 47, 'ds': 40, 'software': 58, 'devops': 36, 'all': 60},
            'skill_scores': {'qa': 35, 'backend': 38, 'mobile': 30, 'frontend': 52, 'ml': 26, 'fullstack': 49, 'ds': 39, 'software': 65, 'devops': 33, 'all': 68},
            'length_score': 43
        }

        self.assertEqual(expected_resume_score, actual_resume_score)

if __name__ == '__main__':
    unittest.main()

import unittest
import sys
sys.path.append('../../')
from server import gen_skill_colors
from server import extract_skills
import pdfplumber
from database import Session

class TestServer(unittest.TestCase):
    def test_gen_skill_colors(self):
        skills = ['Java', 'Python', 'SQL']
        expected = ['229,91,91', '91,229,91', '91,91,229']
        actual = gen_skill_colors(skills)
        self.assertEqual(expected, actual)

    def test_extract_skills(self):
        db = Session()
        with pdfplumber.open('../test-resume.pdf') as pdf:
            pages = [page.extract_text() for page in pdf.pages]
            skills = extract_skills(' '.join(pages), db)
        db.close()
        actual_skill_names = [skill['name'] for skill in skills]
        expected_skill_names = ['Python', 'JavaScript', 'ReactJS', 'Java']
        self.assertEqual(set(expected_skill_names), set(actual_skill_names))

if __name__ == '__main__':
    unittest.main()

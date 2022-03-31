import unittest
import sys
sys.path.append('../../')
from database import Session
from identifiers import extract_requirements, normalize_text, get_years_of_experience
from populate_database import get_skills
import os
import json

with open('./test_data.json') as json_file:
    test_data = json.load(json_file)['test_data']

class TestIdentifiers(unittest.TestCase):
    def test_extract_requirements(self):
        os.chdir('../../')
        skills = get_skills()

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

if __name__ == '__main__':
    unittest.main()

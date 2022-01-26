'''
Search for keywords from the 'skills' dictionary in all the job posts and count how many times each keyword occurs in
the collection of job posts.
'''

import sys
sys.path.append('..')
from database import engine, Base, Session
from crud import get_all_job_posts
from nltk.corpus import stopwords

stop_words_set = set(stopwords.words('english'))

skills = {
    'Javascript': {'Javascript', 'JS'},
    'TypeScript': {'TypeScript'},
    'ReactJS': {'ReactJS', 'React', 'React.JS'},
    'VueJS': {'VueJS', 'Vue', 'Vue.JS'},
    'AngularJS': {'AngularJS', 'Angular', 'Angular.JS'},
    'NodeJS': {'NodeJS', 'Node', 'Node.JS'},
    'ExpressJS': {'ExpressJS', 'Express', 'Express.JS'},
    'GraphQL': {'GraphQL', 'GraphQL.JS'},
    'HTML': {'HTML', 'HTML5', 'HTML/CSS'},
    'CSS': {'CSS', 'CSS3', 'CSS/SASS', 'HTML/CSS'},
    'C#': {'C#', 'C#.NET', 'C#.NET', '.NET', 'C sharp', 'Entity', 'ASP.NET'},
    'database': {'database'},
    'RESTful': {'RESTful'},
    'API': {'API'},
    'SQL': {'SQL', 'PostgreSQL', 'MySQL', 'SQL Server'},
    'NoSQL': {'NoSQL', 'MongoDB', 'Neo4j', 'Cassandra'},
    'Redis': {'Redis'},
    'Kafka': {'Kafka'},
    'Hadoop': {'Hadoop'},
    'Java': {'Java', 'Java8'},
    'Spring': {'Spring', 'Spring Boot'},
    'Dropwizard': {'Dropwizard'},
    'Kotlin': {'Kotlin'},
    'Scala': {'Scala'},
    'microservices': {'microservices'},
    'R': {'R'},
    'Python': {'Python', 'Python3', 'Python2'},
    'Django': {'Django'},
    'Ruby': {'Ruby'},
    'Ruby on Rails': {'Ruby on Rails', 'Rails'},
    'PHP': {'PHP', 'PHP5', 'PHP7'},
    'Laraval': {'Laraval'},
    'Symfony': {'Symfony'},
    'C': {'C'},
    'C++': {'C++'},
    'Go': {'Go', 'Golang'},
    'Rust': {'Rust'},
    'frontend': {'frontend', 'front-end', 'front end'},
    'backend': {'backend', 'back-end', 'back end'},
    'fullstack': {'fullstack', 'full-stack', 'full stack'},
    'Kubernetes': {'Kubernetes'},
    'Jenkins': {'Jenkins'},
    'Docker': {'Docker'},
    'Git': {'Git', 'Version Control'},
    'Linux': {'Linux'},
    'Jira': {'Jira'},
    'Scrum': {'Scrum'},
    'AWS': {'AWS'},
    'Azure': {'Azure'},
    'TDD': {'TDD'},
    'BDD': {'BDD'},
    'CI': {'CI'},
    'Jupyter': {'Jupyter'},
    'Machine learning': {'Machine learning'},
    'iOS': {'iOS'},
    'Swift': {'Swift'},
    'mobile': {'mobile'},
    'shell': {'shell', 'BASH', 'ZSH'},
}

# make all keys and values lowercase
skills_lowercase = {}
for k, v in skills.items():
    skills_lowercase[k.lower()] = [x.lower() for x in v]

def skill_match(word, skills_lowercase):
    for item in skills_lowercase.items():
        key, values_set = item
        if word.lower() in values_set:
            return True, key
    return False, None

# figure out how to run it in main and have a function for csv_to_db.py
# first figure out the helper function

def get_skills(description):
    description_arr = description.split()
    skills_set = set()

    for word in description_arr:
        word = word.lower()
        if word not in stop_words_set:
            match, skill = skill_match(word, skills_lowercase)
            if match:
                skills_set.add(skill)

    return ' '.join(skills_set)

def main():
    db = Session()
    with db.begin():
        Base.metadata.create_all(bind=engine)
    all_job_posts = get_all_job_posts(db)
    skill_counts = {}

    for post in all_job_posts:
        post_words = post.description.split()
        for word in post_words:
            if word not in stop_words_set:
                match, skill = skill_match(word, skills_lowercase)
                if match:
                    if skill not in skill_counts:
                        skill_counts[skill] = 1
                    else:
                        skill_counts[skill] += 1

    sorted_items = sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)
    for item in sorted_items:
        print(item)
    print()

if __name__ == '__main__':
    main()

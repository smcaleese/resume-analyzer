import csv
from database import engine, Base, Session, get_skills_table
from models import Skill
from crud import add_skill

def main():
    db = Session()

    with db.begin():
        Skill.__table__.drop(engine, checkfirst=True)
        Skill.__table__.create(engine)

    with open('skills.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        for row in reader:
            name = row[0]
            altnames = row[1][1:-1].split('|')
            data = {
                'id': hash(name),
                'name': name,
                'altnames': altnames if altnames[0] != '' else None,
                'count': 0
            }
            new_skill = Skill(**data)
            add_skill(db, new_skill)

if __name__ == '__main__':
    main()

import csv
from database import engine, Base, Session, get_skills_table
import models
from crud import add_skill


def main():
    db = Session()
    print(Base.metadata.sorted_tables)
    with db.begin():
        skills_table = get_skills_table()
        skills_table.drop(engine, checkfirst=True)
        skills_table.create(engine)

    with open('skills.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        for row in reader:
            altnames = row[1][1:len(row[1])-1].split('|')
            data = {
                'id': hash(row[0]),
                'name': row[0],
                'altnames': altnames if altnames[0] != '' else None,
                'count': 0
            }
            new_skill = models.Skill(**data)
            add_skill(db, new_skill)

if __name__ == '__main__':
    main()

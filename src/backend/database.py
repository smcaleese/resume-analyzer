from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = \
#     'postgresql://{username}:{password}@{host}:{port}/{database}'.format(
#         username='postgres',
#         password='password',
#         host='aa6s4cuxkizs9d.c2o7e5xoskw1.eu-west-1.rds.amazonaws.com',
#         port='5432',
#         database='ebdb',
#     )

DATABASE_URL = \
    'postgresql://{username}:{password}@{host}:{port}/{database}'.format(
        username='postgres',
        password='password',
        host='localhost',
        port='5432',
        database='postgres',
    )

engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

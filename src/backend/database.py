from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# format: 'postgresql://user:password@localhost:5432/db_name'
# POSTGRESQL_DATABASE_URL = 'postgresql://postgres:password@localhost:5432/postgres'
POSTGRESQL_DATABASE_URL = 'postgres://bawccvbcevmoac:9e3e02dc3d6b4cb25212d14439d0bca163f854a3ce077ff05b960b2ec23b51b0@ec2-34-250-92-138.eu-west-1.compute.amazonaws.com:5432/d8ag0rnn6stb8o'
engine = create_engine(POSTGRESQL_DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

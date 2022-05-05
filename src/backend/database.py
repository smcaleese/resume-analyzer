from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dbconfig import config

DATABASE_URL = 'postgresql://{username}:{password}@{host}:{port}/{database}'.format(**config)

engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

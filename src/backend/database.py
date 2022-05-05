from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import dotenv_values

'''
Each setting overrides the previous setting. The '.env.local' file is in the repo but '.env.production'
needs to be created. Comment out a setting to change which database is used by the populate_database.py script.
'''

config = {
    **dotenv_values('.env.local'),
    **dotenv_values('.env.production'),
    **os.environ,  # AWS production settings
}

DATABASE_URL = 'postgresql://{username}:{password}@{host}:{port}/{database}'.format(**config)

engine = create_engine(DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

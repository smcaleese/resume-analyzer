from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# format: 'postgresql://user:password@localhost:5432/db_name'
# POSTGRESQL_DATABASE_URL = 'postgresql://postgres:password@localhost:5432/postgres'
POSTGRESQL_DATABASE_URL = 'postgresql://stephen:mcaleese@localhost:5432/db'
engine = create_engine(POSTGRESQL_DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# format: 'postgresql://user:password@localhost:5432/db_name'
# POSTGRESQL_DATABASE_URL = 'postgresql://postgres:password@localhost:5432/postgres'
POSTGRESQL_DATABASE_URL = 'postgresql://yetzczffezlcxr:bd02857349481b044d722ca72edceeec94129ee442e19ed4349ef1d34f7dae19@ec2-54-73-178-126.eu-west-1.compute.amazonaws.com:5432/dfvglduvium1j2'

engine = create_engine(POSTGRESQL_DATABASE_URL, echo=True)

Session = sessionmaker(bind=engine)
Base = declarative_base()

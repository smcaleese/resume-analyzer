from sqlalchemy import Column, BigInteger, String, Text, ARRAY, Integer
from sqlalchemy.schema import Identity
from sqlalchemy.dialects.postgresql import ARRAY
from database import Base

class JobPost(Base):
    __tablename__ = 'job_post'
    id = Column(BigInteger, primary_key=True)
    company = Column(String, nullable=False)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(Text)
    requirements = Column(ARRAY(String))
    experience = Column(ARRAY(Integer), nullable=True)
    role = Column(String, nullable=True)

    def __repr__(self):
        return '<JobPost id={} company={} title={} location={} description={} requirements={} experience={} role={}>' \
                .format(self.id, self.company, self.title, self.location, self.description, self.requirements, self.experience, self.role)

class Skill(Base):
    __tablename__ = 'skill'
    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    altnames = Column(ARRAY(String))
    count = Column(Integer, nullable=False)

    def __repr__(self):
        return '<Skill id={} name={} altnames={} count={}>' \
                .format(self.id, self.name, self.altnames, self.count)


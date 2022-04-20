from sqlalchemy import Column, BigInteger, String, Text, ARRAY, Integer, Float
from sqlalchemy.schema import Identity
from sqlalchemy.dialects.postgresql import ARRAY
from database import Base

class JobPost(Base):
    __tablename__ = 'job_post'
    id = Column(BigInteger, primary_key=True, nullable=False)
    company = Column(String, nullable=False)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(Text)
    requirements = Column(ARRAY(String))
    soft_skills = Column(ARRAY(String))
    experience = Column(ARRAY(Integer))
    role = Column(String)

    def __repr__(self):
        return '<JobPost id={} company={} title={} location={} description={} requirements={} soft_skills={} experience={} role={}>' \
                .format(self.id, self.company, self.title, self.location, self.description, self.requirements, self.soft_skills, self.experience, self.role)

class Skill(Base):
    __tablename__ = 'skill'
    id = Column(BigInteger, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    altnames = Column(ARRAY(String))
    count = Column(Integer, nullable=False)

    def __repr__(self):
        return '<Skill id={} name={} altnames={} count={}>' \
                .format(self.id, self.name, self.altnames, self.count)

class SoftSkill(Base):
    __tablename__ = 'soft_skill'
    id = Column(BigInteger, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    altnames = Column(ARRAY(String))
    count = Column(Integer, nullable=False)

    def __repr__(self):
        return '<SoftSkill id={} name={} altnames={} count={}>' \
                .format(self.id, self.name, self.altnames, self.count)

class Rule(Base):
    __tablename__ = 'rule'
    id = Column(BigInteger, primary_key=True, nullable=False)
    lhs = Column(ARRAY(String))
    rhs = Column(String)
    support = Column(Float)
    confidence = Column(Float)
    lift = Column(Float)

    def __repr__(self):
        return '<Rule id={} lhs={} rhs={} support={} confidence={} lift={}>' \
                .format(self.id, self.lhs, self.rhs, self.support, self.confidence, self.lift)

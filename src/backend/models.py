from sqlalchemy import Column, BigInteger, String, Text, ARRAY
from sqlalchemy.schema import Identity
from database import Base

class JobPost(Base):
    __tablename__ = 'job_post'
    id = Column(BigInteger, primary_key=True)
    company = Column(String, nullable=False)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    description = Column(Text)
    requirements = Column(String)

    def __repr__(self):
        return '<JobPost id={} company={} title={} location={} description={} requirements={}>' \
                .format(self.id, self.company, self.title, self.location, self.description, self.requirements)

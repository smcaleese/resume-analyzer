# from sqlalchemy import Column, Integer, String
# from .database import Base

# class JobPost(Base):
#     __tablename__ = 'job_post'
#     id = Column(String, primary_key=True)
#     company = Column(String)
#     job_title = Column(String)
#     location = Column(String)
#     description = Column(String)

#     def __repr__(self):
#         return '<JobPost id={} company={} job_title={} location={} description={}>' \
#                 .format(self.id, self.company, self.job_title, self.location, self.description)

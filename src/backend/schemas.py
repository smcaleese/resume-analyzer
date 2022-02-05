from pydantic import BaseModel

class JobPost(BaseModel):
    id: int
    company: str
    title: str
    location: str
    description: str
    requirements: list

    class Config:
        orm_mode = True

class Skill(BaseModel):
    id: int
    name: str
    altnames: list
    count: int

    class Config:
        orm_mode = True

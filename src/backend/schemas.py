from pydantic import BaseModel

class JobPost(BaseModel):
    id: int
    company: str
    title: str
    location: str
    description: str
    requirements: list
    experience: list
    role: str

    class Config:
        orm_mode = True

class Skill(BaseModel):
    id: int
    name: str
    altnames: list
    count: int

    class Config:
        orm_mode = True

class Rule(BaseModel):
    id: int
    lhs: list
    rhs: str
    support: float
    confidence: float
    lift: float

    class Config:
        orm_mode = True


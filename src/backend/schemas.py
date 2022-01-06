from pydantic import BaseModel

class JobPost(BaseModel):
    id: int
    company: str
    title: str
    location: str
    description: str

    class Config:
        orm_mode = True

from fastapi import FastAPI
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Sum(BaseModel):
    left: int
    right: int

@app.get("/")
async def root():
    return {"hello": "world"}


@app.post("/sum")
async def sum(value: Sum):
    return {"result": value.left + value.right}
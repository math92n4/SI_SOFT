from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/fastapi")
def root():
    return {"data": "This is data from FastAPI"}


@app.get("/expressdata")
def root():
    response = requests.get("http://localhost:8080/express")
    response_dict = response.json()
    return response_dict
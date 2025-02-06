from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello World"}


@app.get("/greeting")
def root():
    return {"data": "greeting"}
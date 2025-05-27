from fastapi import FastAPI
import requests
from parse import getCsv, getJson, getTxt, getXml, getYaml

app = FastAPI()

@app.get("/express/json")
def json():
    response = requests.get("http://localhost:8080/json")
    return response.json()

@app.get("/express/csv")
def json():
    response = requests.get("http://localhost:8080/csv")
    return response.json()

@app.get("/express/yaml")
def json():
    response = requests.get("http://localhost:8080/yaml")
    return response.json()

@app.get("/express/xml")
def json():
    response = requests.get("http://localhost:8080/xml")
    return response.json()

@app.get("/express/txt")
def json():
    response = requests.get("http://localhost:8080/txt")
    return response.json()

@app.get("/json")
def parseJson():
    json = getJson()
    return {"data": json}

@app.get("/csv")
def parseCsv():
    csv = getCsv()
    return {"data": csv}

@app.get("/xml")
def parseXml():
    xml = getXml()
    return {"data": xml}

@app.get("/txt")
def parseTxt():
    txt = getTxt()
    return {"data": txt}

@app.get("/yaml")
def parseYaml():
    yaml = getYaml()
    return {"data": yaml}
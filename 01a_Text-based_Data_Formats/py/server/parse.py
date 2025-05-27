class City:
    def __init__(self, city, characteristic, popularFoods):
        self.city = city
        self.characteristic = characteristic
        self.popularFoods = popularFoods

    def __str__(self):
        return f"{self.city}, {self.characteristic}, {self.popularFoods}"

# JSON
import json
import os

base_path = os.path.dirname(__file__)

def getJson():
    with open('../data/newyork.json') as f:
        data = json.load(f)
    
    city = City(data['city'], data['characteristic'], data['popularFoods'])
    
    return city

jsonCity = getJson()
print(jsonCity, "JSON")


# CSV
import csv

def getCsv():

    with open('../data/newyork.csv') as csv_file:
        reader = csv.reader(csv_file)

        next(reader)

        row = next(reader)
        city = City(row[0], row[1], row[2].split(";"))

        csv_file.close()
    
    return city

csvCity = getCsv()    
print(csvCity, "CSV")


# XML
import xml.etree.ElementTree as ET

def getXml():

    tree = ET.parse('../data/newyork.xml')
    root = tree.getroot()
    
    city = root.find('city').text
    characteristic = root.find('characteristic').text
    popularFoods = [food.text for food in root.findall('.//food')]

    cityObj = City(city, characteristic, popularFoods)
    return cityObj


xmlCity = getXml()
print(xmlCity, "XML")


# TXT
def getTxt():
    
    file = open('../data/newyork.txt')
    lines = file.readlines()

    data = {}

    for line in lines: 
        key, value = line.strip().split(": ", 1)
        data[key] = value
        
    popularFoods = [food.strip() for food in data.get('popularFoods', '').split(',')]

    city = City(data.get('city'), data.get('characteristic'), popularFoods)
    
    return city

txtCity = getTxt()
print(txtCity, 'TXT')



# YAML
import yaml

def getYaml():

    with open('../data/newyork.yaml') as f:
        data = yaml.safe_load(f)
        city = City(data.get('city'), data.get('characteristic'), data.get('popularFoods', []))
        
        return city

yamlCity = getYaml()
print(yamlCity, 'YAML')
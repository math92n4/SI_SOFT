import fs from 'fs'
import { promises as fsPromises } from 'fs';
import csv from 'csv-parser'
import { parseStringPromise } from "xml2js";
import { fileURLToPath } from 'url';
import path from 'path'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON

export async function getJson() {
    const filePath = path.join(__dirname, 'data', 'me.json')
    const res = await fsPromises.readFile(filePath, 'utf-8'); 
    const data = JSON.parse(res);
    return { name: data.name, age: data.age, hobbies: data.hobbies }
}

// CSV
// https://www.npmjs.com/package/csv-parser

export async function getCsv() {
    const filePath = path.join(__dirname, 'data', 'me.csv')

    return new Promise((resolve, reject) => {
      const results = [];
  
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          data.hobbies = data.hobbies.split(';');
          results.push(data);
        })
        .on('end', () => {
          const person = { name: results[0].name, age: parseInt(results[0].age), hobbies: results[0].hobbies }
          resolve(person);
        })
        .on('error', (error) => reject(error));
    });
  }

// XML

export async function getXml() {
    const filePath = path.join(__dirname, 'data', 'me.xml')
    const res = await fs.promises.readFile(filePath, 'utf-8')
    const data = await parseStringPromise(res, { explicitArray: false })
    const person = data.me;
    return { name: person.name, age: parseInt(person.age), hobbies: person.hobbies.hobby }
}

// TXT

export async function getTxt() {
    const filePath = path.join(__dirname, 'data', 'me.txt')
    const res = await fs.promises.readFile(filePath, 'utf-8')
    const lines = res.split('\n')
    const person = {}

    lines.forEach(line => {
        const [key, value] = line.split(':').map(text => text.trim())

        if(value.includes(',')) {
            person[key] = value.split(',').map(arr => arr.trim())
        
        } else if (!isNaN(value)) {

            person[key] = parseInt(value)

        } else {
            person[key] = value
        }
        
    })
    return person
}


// YAML
// https://www.npmjs.com/package/yaml

export async function getYaml() {
    const filePath = path.join(__dirname, 'data', 'me.yaml')
    const file = await fsPromises.readFile(filePath, 'utf-8')
    return YAML.parse(file)
}

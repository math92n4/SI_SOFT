import fs from 'fs'
const { promises: fsPromises } = fs
import csv from 'csv-parser'
import { parseStringPromise } from "xml2js";
import YAML from 'yaml'

// JSON

async function getJson() {
    const res = await fsPromises.readFile('./data/me.json', 'utf-8'); 
    const data = JSON.parse(res);
    return { name: data.name, age: data.age, hobbies: data.hobbies }
}


const jsonPerson = await getJson();
console.log(jsonPerson, 'JSON')

// CSV
// https://www.npmjs.com/package/csv-parser

async function getCsv() {
    return new Promise((resolve, reject) => {
      const results = [];
  
      fs.createReadStream('./data/me.csv')
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


const csvPerson = await getCsv()
console.log(csvPerson, 'CSV')

// XML

async function getXml() {
    const res = await fs.promises.readFile('./data/me.xml', 'utf-8')
    const data = await parseStringPromise(res, { explicitArray: false })
    const person = data.me;
    return { name: person.name, age: parseInt(person.age), hobbies: person.hobbies.hobby }
}

const xmlPerson = await getXml()
console.log(xmlPerson, 'XML')

// TXT

async function getTxt() {
    const res = await fs.promises.readFile('./data/me.txt', 'utf-8')
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

const txtPerson = await getTxt()
console.log(txtPerson, 'TXT')

// YAML
// https://www.npmjs.com/package/yaml

function getYaml() {
    const file = fs.readFileSync('./data/me.yaml', 'utf-8')
    return YAML.parse(file)
}

const yamlPerson = getYaml()
console.log(yamlPerson, 'YAML')
import express from 'express'
import { getJson, getCsv, getXml, getTxt, getYaml } from '../parse.js'

const app = express();

const FAST_API_URL = "http://localhost:8080"

app.get("/json", async (req, res) => {
    const json = await getJson()
    res.send({ "data": json })
})

app.get("/csv", async (req, res) => {
    const csv = await getCsv()
    res.send({ "data": csv })
})

app.get("/xml", async (req, res) => {
    const xml = await getXml()
    res.send({ "data": xml })
})

app.get("/txt", async (req, res) => {
    const txt = await getTxt()
    res.send({ "data": txt })
})

app.get("/yaml", (req, res) => {
    const yaml = getYaml()
    res.send({ "data": yaml })
})

app.get("/fastapi/json", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/json`);
    const data = await response.json();
    res.send({ "data": data });
})

app.get("/fastapi/txt", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/txt`);
    const data = await response.json();
    res.send({ "data": data });
})

app.get("/fastapi/yaml", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/yaml`);
    const data = await response.json();
    res.send({ "data": data });
})

app.get("/fastapi/txt", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/txt`);
    const data = await response.json();
    res.send({ "data": data });
})

app.get("/fastapi/csv", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/csv`);
    const data = await response.json();
    res.send({ "data": data });
})

app.get("/fastapi/xml", async (req, res) => {
    const response = await fetch(`${FAST_API_URL}/xml`);
    const data = await response.json();
    res.send({ "data": data });
})

const PORT = 8080;

app.listen(PORT, () => 
    console.log(`Listening on ${PORT}`)
);
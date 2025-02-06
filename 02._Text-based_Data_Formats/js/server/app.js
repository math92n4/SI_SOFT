import express from 'express'
import { getJson, getCsv, getXml, getTxt, getYaml } from '../parse.js'

const app = express();

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

const PORT = 3000;

app.listen(PORT, () => 
    console.log(`Listening on ${PORT}`)
);
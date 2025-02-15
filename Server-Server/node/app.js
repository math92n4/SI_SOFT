import express from "express";

const app = express();

app.get('/express', (req, res) => {
    res.send({ data: "This is data from express" })
})

app.get('/fastapidata', async (req, res) => {
    const response = await fetch("http://localhost:8000/fastapi");
    const data = await response.json();
    res.send(data);
})

app.get('/name/:name', (req, res) => {
    const name = req.params.name
    console.log(name)
    res.send({ data: `Your name is ${name}`})
})

let arr = [
    1, 2, 3, 4, 5, 6
]

app.get('/numbers', (req, res) => {
    res.send({ data: arr })
})

app.post('/numbers/:number', (req, res) => {
    const number = parseInt(req.params.number)
    if (isNaN(number)) {
        return res.send({ data: "Please enter a number" })
    }
    arr.push(number)
    return res.send({ data: arr })
})

app.put('/numbers', (req, res) => {
    arr.sort(function(a, b) {
        return a - b;
    });
    res.send({ data: arr })
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
import express from "express";

const app = express();
app.use(express.static("public"));

const randomNumbers = [1, 33, 99];

app.get("/randomnumbers", (req, res) => {
    res.send({ data: randomNumbers });
});

app.get("/simulatenewnumbers", (req, res) => {
    const randomNumber = getRandomInt(0,100)
    randomNumbers.push(randomNumber);

    res.send({ data: randomNumber });
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const PORT = 8080;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
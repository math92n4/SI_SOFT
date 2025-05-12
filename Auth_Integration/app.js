import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
    res.sendFile(path.join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log("Application running on port 8080"));

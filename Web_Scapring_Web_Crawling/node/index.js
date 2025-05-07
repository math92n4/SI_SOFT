import fs from "fs";
import { load } from "cheerio";

const page = await fs.readFileSync("index.html", "utf-8");
const $ = load(page);

$("#products [product]").each((index, element) => {
    const name = $(element).find(".site-product-link").text();
    const price = $(element).find(".site-currency-lg").text();
    console.log(price)
});

/* const res = await fetch("https://www.proshop.dk/Baerbar");
const result = await res.text();

fs.writeFileSync("index.html", result); */
const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

let browser = undefined;

app.use(async (request, response, next) => {
    if (browser === undefined) {
        browser = await puppeteer.launch({ executablePath: "/usr/bin/chromium", args: ['--no-sandbox'], userDataDir: "/puppeteer-cache" });
    }
    next()
})


app.get("/", async (request, response) => {
    const esfEncoded = request.query.fit;
    if (esfEncoded === undefined || esfEncoded === "ENCODED_ESF_FIT") {
        response.status(400);
        response.send("Invalid request");
        return;
    }

    const page = await browser.newPage();
    await page.setViewport({
        width: 1142,
        height: 772,
    });
    await page.goto("https://eveship.fit/preview?fit=" + esfEncoded, { waitUntil: "networkidle0" });
    image = await page.screenshot();

    response.set("Content-Type", "image/png");
    response.send(image);
});

app.listen(8080, () => {
    console.log("Listening on port 8080...");
});



import puppeteer from "puppeteer";

function sleep(ms) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

export async function GET() {
    return new Response(JSON.stringify(await go('https://nomenawa.netlify.app/proxy')))
}
//
async function go(url) {
    let content;
    try {
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const page = await browser.newPage();
        await page.goto(url);
        await sleep(5000);
        content = await page.content();
        console.log(content);
        await browser.close();
    } catch (err) {
        console.error(err);
    }

    return content;
}

export async function POST({ request }) {
    let value = await request.json();
    var result;
    try {
        result = await go(value.url)
    } catch (error) {
        result = error;
    } finally {
        return new Response(
            JSON.stringify(result)
        )
    }

}

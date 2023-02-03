import puppeteer from "puppeteer";

/*

From YorkQu

Thank you for your time!
But actually the main program of my project is not index.js
I just follow the direction and create a index.js

I have tried many similar programs in the past, like BrowserStack, Lambda Test
But there are some efficiency issues, sometimes the network transfer is very slow
I need to reduce the run time to as little as possible to ten seconds

Thank you very much for taking the time on this, even though I am a beginner

------


+ What I need?
- I need install Chrome or Chromium, the Chromium is better

+ Reference Instructions
- `sudo apt install chromium-browser`

+ May need to know
- The project uses the sveltekit framework, using nodejs

*/

async function main(url) {
    try {
        const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
        const page = await browser.newPage();

        // Try connect target url
        await page.goto(url);
        console.log('+ [Puppeteer] Goto: '+ url)

        // Wait for load
        await sleep(1000);

        // Take screenshop and save to output file
        await page.screenshot({ path: 'output/p' })
        console.log('+ [Puppeteer] Screenshot')

        // Close Browser
        await page.close();
        console.log('+ [Puppeteer] Done!')
    } catch (err) {
        console.error(err);
    }
}

// main('https://example.com')

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

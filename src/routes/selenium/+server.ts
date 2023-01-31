import { Builder, By, Key, until } from "selenium-webdriver";
// import './declarations.d.ts';
import chrome from "selenium-webdriver/chrome";
import edge from "selenium-webdriver/edge";
// import SeleniumManager from "selenium-manager"

async function example() {
    // var service = new edge.ServiceBuilder()
    //     .setPort(55555)
    //     .build();
    // var options = new edge.Options();
    // var driver = edge.Driver.createSession(options, service);
    // let driver = await new Builder()
    //     // .usingServer(SeleniumManager.start())
    //     .forBrowser('firefox')
    //     .build();
    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
}

// "/project/home/helloyork/workspace/node_modules/chromedriver/lib/chromedriver/chromedriver"
// "/project/home/helloyork/workspace/node_modules/chromedriver/chromedriver"
export async function GET() {
    return new Response(JSON.stringify(await example()));
}

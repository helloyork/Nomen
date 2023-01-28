import { Builder, Browser, By, Key, until } from 'selenium-webdriver'

//["Browser","Builder","Button","By","RelativeBy","withTagName","locateWith","Capabilities","Capability","Condition",
//"FileDetector","Key","Origin","Session","ThenableWebDriver","WebDriver","WebElement","WebElementCondition","WebElementPromise",
//"error","logging","promise","until","Select","LogInspector","BrowsingContext"]

export async function GET() {
    let driver = await new Builder().forBrowser(Browser.EDGE).build();
    let a;
    try {
        await driver.get('https://www.google.com/');
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        a = await driver.getPageSource()
        // a=await driver.findElement(By.className('L3eUgb'))
        // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        // await driver.quit();
    }
    // let driver = webdriver.Firefox();
    return new Response(JSON.stringify(a));
}

async function exa(url) {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    let a;
    try {
        await driver.get(url);
        await driver.wait(until.titleIs('Google'));
        a = await driver.getPageSource()
    } finally {
        // await driver.quit();
    }
    return a;
}

export async function POST({ request }) {
    let value = await request.json();
    if (value.password != 'hellonomen2q3a') {
        return new Response(JSON.stringify('密码错误，请不要尝试弱口令爆破，多次输入错误将永久ip封禁! Password wrong, please do not try weak password blasting, multiple input wrong will be permanently ip blocked!'))
    }
    var result;
    try {
        result=await exa(value.url)
    } catch (error) {
        result=error;
    }finally{
        return new Response(
            JSON.stringify(result)
        )
    }
    
}
        // await (new Promise((resolve) => {
            // fetch(value.url)
            //     .then(v => v.text())
            //     .then(v => resolve(v))
            //     .catch(e => resolve(e))
        // }))
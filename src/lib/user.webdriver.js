import webdriver from "selenium-webdriver";
import fast_selenium from '$lib/fast-selenium.js'
import capabilities from '$lib/capabilities.json';
import cheerio from "cheerio";
import { sql } from "./user.log";
import { check } from '$lib/user.identify';

//@ts-ignore
export async function run(username, accessKey, url) {
    if (!check(username, accessKey)) return { ok: false, resolve: false, error: 'Wrong username or accessKey', result: null, }
    return await browser(url, username, accessKey);
}

async function browser(url, username, accessKey) {
    console.log(`=== ${new Date().toDateString()} ${username} : ${accessKey} ===`);
    let start = Date.now();
    console.log('[Selenium] Selenium is running');
    if (!jugeUrl(url)) {
        console.log(`=== ${new Date().toDateString()} Task Stop in ${start - Date.now()} ms ===`);;
        return { ok: false, resolve: false, error: '无效资源地址', result: null, }
    }
    try {
        var driver = new webdriver.Builder()
            .usingServer(`http://${username}:${accessKey}@hub-cloud.browserstack.com/wd/hub`)
            .withCapabilities(capabilities["Windows10-Chrome"]).build();
        console.log('[Selenium] Driver Build');
    } catch (err) {
        return { ok: false, resolve: true, error: '无法构建Webdriver: ' + err, result: null, }
    }
    try {
        sql(({ insert }) => {
            insert(username, `Try Get ${url}`)
        })
        console.log('[Selenium] -Start Getting resources: ' + url);
        await driver.get(url);
        console.log('[Selenium] +Done Getting resources: ' + url);

        const $ = cheerio.load(await driver.getPageSource());
        $("a[href^='/'], img[src^='/']").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href")) {
                $this.attr("href", `${url}/${$this.attr("href")}`);
            }
            if ($this.attr("src")) {
                $this.attr("src", `${url}/${$this.attr("src")}`);
            }
        })

        console.log('[Selenium] -Start Getting PageResources');
        let result = await driver.getPageSource();
        console.log('[Selenium] +Done Getting PageResources');

        await driver.quit();
        console.log('[Selenium] +Done');
        console.log(`--- ${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s ---`);
        return { ok: true, resolve: true, error: null, result, };
    } catch (err) {
        console.log(`${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s\nError: ${err}`);
        return { ok: false, resolve: true, error: '无法运行Webdriver: ' + err, result: null, }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => { resolve(true) }, ms))
}

function jugeUrl(t) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(t)
}




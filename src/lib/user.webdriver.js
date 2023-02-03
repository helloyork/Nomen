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

const optimisation = {
    "bilibili.com": ($, html) => {
        html = replace(html, `throw new Error("can't be iframed")`, `console.log('[Nomen] optimisation')`);
        html = replace(html, `window.location.origin.replace("www","m")`, `"https://bilibili.com"`);
        html = cut(html, `window.location.href=a`);
        html = replace(html, `parent!=self&&(parent.document.domain!=document.domain||document.referrer&&!/^http(s)?:\/\/[.\w-]+\.bilibili\.com\//i.test(document.referrer))`, `false`);
        return html;
    }
}

function cut(taregt, word) {
    return taregt.split(word).join('');
}
function replace(taregt, word, replace) {
    return taregt.split(word).join(replace);
}

async function browser(url, username, accessKey) {
    console.log(`=== ${new Date().toDateString()} ${username} : ${accessKey} ===`);
    let start = Date.now();
    console.log('[Selenium] Selenium is running');
    if (!jugeUrl(url)) {
        console.log(`=== ${new Date().toDateString()} Task Stop in ${start - Date.now()} ms ===`);;
        return { ok: false, resolve: false, error: '无效资源地址', result: null, }
    }
    let target = (new URL(url)).hostname;
    if (target.startsWith('www.')) target = target.split('www.').join('');

    try {
        var driver = new webdriver.Builder()
            .usingServer(`http://${username}:${accessKey}@hub.lambdatest.com/wd/hub`)
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

        // const getScrollHeight = () => { return driver.executeScript(() => { return document.body.scrollHeight; }); };
        // const getCurrentScrollPosition = () => { return driver.executeScript(() => { return window.pageYOffset; }); };
        // const scrollStep = 500;
        // let lastScrollHeight = await getScrollHeight();
        // let currentScrollPosition = await getCurrentScrollPosition();
        // while (currentScrollPosition + window.innerHeight < lastScrollHeight) {
        //     await driver.executeScript(`window.scrollTo(0,${currentScrollPosition + scrollStep});`);
        //     await driver.sleep(200);
        //     currentScrollPosition = await getCurrentScrollPosition();
        //     console.log('[Scroll] Scroll to '+currentScrollPosition)
        // }
        await driver.executeScript(`window.scrollTo(0,900);`);
        console.log('[Selenium] +Done Getting resources: ' + url);

        console.log('[Selenium] -Start Getting PageResources');
        let PageResources = await driver.getPageSource()
        const $ = cheerio.load(PageResources);
        let tUrl = new URL(url);
        $("a[href^='/'], img[src^='/']").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href")) {//${((!$this.attr("href").startsWith('/')) && url.charAt(url.length - 1) != '/') ? '/' : ''}
                $this.attr("href", `${tUrl.origin}/${$this.attr("href")}`);
            } if ($this.attr("src")) {
                $this.attr("src", `${tUrl.origin}/${$this.attr("src")}`);
            }
        })
        $("link[href^='/'], script[src^='/']").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href") && $this.attr("href")?.startsWith('//')) {
                $this.attr("href", `https:${$this.attr("href")}`);
            } if ($this.attr("src") && $this.attr("src")?.startsWith('//')) {
                $this.attr("src", `https:${$this.attr("src")}`);
            }
        })

        let result = $.html();
        if (optimisation[target] !== undefined) result = optimisation[target]($, result);
        console.log('[Selenium] +Done Getting PageResources');

        await driver.quit();
        console.log('[Selenium] +Done');
        console.log(`--- ${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s ---`);
        return { ok: true, resolve: true, error: null, result, };
    } catch (err) {
        console.log(`${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s\nError: ${err}`);
        return { ok: false, resolve: true, error: '无法运行Webdriver: ' + (err.toString().includes('ERR_NAME_NOT_RESOLVED') ? '网址不存在' : err), result: null, }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => { resolve(true) }, ms))
}

function jugeUrl(t) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(t)
}




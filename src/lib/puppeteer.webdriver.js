// @ts-nocheck

import puppeteer from "puppeteer";
import capabilities from './capabilities.json' assert { type: "json" };
import cheerio from "cheerio";
import { sql } from "./log/user.log.js";
import { check } from './user.identify.js';
import http from 'http';
import https from 'https';
import { write } from "./webdata/webdata.js";


export async function run(nickname, password, url) {
    let res = check(nickname, password)
    if (!res) return { ok: false, resolve: false, error: 'Wrong username or accessKey', result: null, }
    return await browser(url, res.username, res.accessKey);
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
    console.log(`=== ${new Date().toDateString()} ${username} ===`);
    let start = Date.now();
    console.log('[Selenium] Selenium is running');
    if (!jugeUrl(url)) {
        console.log(`=== ${new Date().toDateString()} Task Stop in ${start - Date.now()} ms ===`);;
        return { ok: false, resolve: false, error: '无效资源地址', result: null, }
    }
    let target = (new URL(url)).hostname;
    if (target.startsWith('www.')) target = target.split('www.').join('');

    try {
        var browser = await puppeteer.connect({
            browserWSEndpoint:
                `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
        })
        var page = await browser.newPage();
        await page.setViewport({
            width: 1024,
            height: 6900,
            deviceScaleFactor: 1,
        });
        await page.setExtraHTTPHeaders({
            referrer: url,
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
        })
        console.log('[Puppeteer] Browser Ready');
    } catch (err) {
        return { ok: false, resolve: true, error: '无法启动Puppeteer Browser: ' + err, result: null, }
    } try {
        sql(({ insert }) => {
            insert(username, `Try Get ${url}`)
        })

        console.log('[Puppeteer] -Start Getting resources: ' + url);
        await page.goto(url);
        console.log('[Puppeteer] +Done Getting resources: ' + url);

        console.log('[Puppeteer] -Start Getting PageResources');
        let PageResources = await page.content();
        const $ = cheerio.load(PageResources);
        let tUrl = new URL(url);
        $("a[href^='/'], img[src^='/']").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href")) {
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
        console.log('[Puppeteer] +Done Getting PageResources');

        await browser.close();
        console.log('[Puppeteer] +Close');

        let webdata = await write(tUrl.origin, result);
        console.log(`[WebData] ${webdata}`);
        console.log('[Database webdata.db] +Done');

        console.log(`--- ${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s ---`);
        return { ok: true, resolve: true, error: null, result, webdata };
    } catch (err) {
        console.log(`${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s\nError: ${err}`);
        return { ok: false, resolve: true, error: '无法运行Puppeteer Browser: ' + (err.toString().includes('ERR_NAME_NOT_RESOLVED') ? '网址不存在' : err), result: null, }
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => { resolve(true) }, ms))
}

function jugeUrl(t) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(t)
}


var keepAliveTimeout = 30 * 1000;

if (http.globalAgent && http.globalAgent.hasOwnProperty('keepAlive')) {
    http.globalAgent.keepAlive = true;
    https.globalAgent.keepAlive = true;
    http.globalAgent.keepAliveMsecs = keepAliveTimeout;
    https.globalAgent.keepAliveMsecs = keepAliveTimeout;
} else {
    var agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });
    var secureAgent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: keepAliveTimeout
    });
    var httpRequest = http.request;
    var httpsRequest = https.request;
    http.request = function (options, callback) {
        if (options.protocol == "https:") {
            options["agent"] = secureAgent;
            return httpsRequest(options, callback);
        }
        else {
            options["agent"] = agent;
            return httpRequest(options, callback);
        }
    };
}


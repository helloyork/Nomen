//@ts-nocheck

import puppeteer from "puppeteer";
import cheerio from "cheerio";
import axios from "axios";

import http from 'http';
import https from 'https';
import fs from "fs";

import capabilities from './capabilities.json' assert { type: "json" };

import { sql } from "./log/user.log.js";
import { check } from './identify.js';
import { write } from "./webdata/webdata.js";
import { userread, userwrite } from "./user/user.manage.js";
import md5 from "md5";


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
        $('source').remove();
        html = $.html();
        return html;
    }
}

const init = {
    point: 1000
}

function cut(taregt, word) {
    return taregt.split(word).join('');
}
function replace(taregt, word, replace) {
    return taregt.split(word).join(replace);
}

async function browser(url, username, password) {
    console.log(`=== ${new Date().toDateString()} ${username} ===`);
    let start = Date.now();
    if (!jugeUrl(url)) {
        console.log(`=== ${new Date().toDateString()} Task Stop in ${start - Date.now()} ms ===`);;
        return { ok: false, resolve: false, error: '无效资源地址', result: null, }
    }
    let target = (new URL(url)).hostname;
    if (target.startsWith('www.')) target = target.split('www.').join('');

    try {
        var header = [
            {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
                "Cookie": "",
                "Referer": url,
                "Referrer": url,
                "Content-Type": "text/html"
            }, {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
                "Cookie": "",
                "Referer": url,
                "Referrer": url,
                "Content-Type": "text/html"
            }, {
                "Accept": "text/html, application/xhtml+xml, image/jxr, */*",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "en-US,en;q=0.5",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
                "Cookie": "",
                "Referer": url,
                "Referrer": url,
                "Content-Type": "text/html"
            }
        ];
        var imageNormal = ['s1.baozimh.com', 'i2.hdslb.com', 'i1.hdslb.com', 'i0.hdslb.com'];
        var user = await userread(username);
        if (user.length <= 0) {
            await userwrite(username, password, JSON.stringify(init));
            user = await userread(username);
        }
        var uservalue = JSON.parse(user[0].value);
        if (uservalue.point <= 20) return { ok: false, resolve: true, error: '可用积分不足', result: null, }
        console.log('[Puppeteer] Try Connecting');
        var browser = await puppeteer.connect({
            browserWSEndpoint:
                `wss://cdp.lambdatest.com/puppeteer?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
        })
        var page = await browser.newPage();
        await page.setViewport({
            width: 1024,
            height: 14000,
            deviceScaleFactor: 1,
        });
        await page.setExtraHTTPHeaders(header[Math.floor(Math.random() * header.length)]);
        console.log('[Puppeteer] Browser Ready');
    } catch (err) {
        return { ok: false, resolve: true, error: '无法启动Puppeteer Browser: ' + err, result: null, }
    } try {
        async function normalGetData(urle) {
            return new Promise((resolve) => {
                axios.head(urle)
                    .then(response => {
                        console.log(`+[Axios] ${urle} : ${response.status}`);
                        resolve(response.status === 200);
                    })
                    .catch(() => {
                        console.log(`-[Axios] ${urle} : Error`);
                        resolve(false)
                    })
            })
        }
        async function getImageNormal(url) {
            return new Promise((resolve) => {
                try {
                    axios.get(url, {
                        responseType: 'arraybuffer',
                        headers: header[Math.floor(Math.random() * header.length)]
                    }).then(response => {
                        console.log(`+[Axios ImageNormal] Try get ${url}`);
                        let path = `src/static/img/user/${username}/${(new URL(url)).origin}/${md5(response.data)}.${response.headers['content-type'].split('/')[1]}`;
                        fs.mkdirSync(`src/static/img/user/${username}/${(new URL(url)).origin}`, { recursive: true });
                        fs.writeFileSync(path, response.data)
                        console.log(`+[File System][Axios ImageNormal] Write ${path}`);
                        resolve(`/${path}`);
                    }).catch(err => {
                        console.log(`-[Axios ImageNormal] Error get ${url}`);
                        resolve(url);
                    })
                } catch (err) {
                    resolve(url);
                    console.log(`=[Axios ImageNormal] Error get ${url}`);
                }
            })
        }
        sql(({ insert }) => {
            insert(username, `Try Get ${url}`)
        })

        console.log('[Puppeteer] -Start Getting resources: ' + url);
        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForTimeout(2000);
        console.log('[Puppeteer] +Done Getting resources: ' + url);

        console.log('[Puppeteer] -Start Getting PageResources');
        let PageResources = await page.content();

        await browser.close();
        console.log('[Puppeteer] +Close');

        const $ = cheerio.load(PageResources);
        let tUrl = new URL(url);
        let images = $("img");
        for (let i = 0; i < images.length; i++) {
            let src = images[i].attribs.src;
            if (src && src.startsWith("//")) src = `https:${src}`;
            else if (src && src.startsWith("/")) src = `${tUrl.origin}${src}`;
            await normalGetData(src)
            if (src && imageNormal.includes(((new URL(src)).host).split('www.').join(''))) {
                $(images[i]).attr('src', await getImageNormal(src));
            } else $(images[i]).attr('src', src);
            if (tUrl.origin.includes('bilibili')) await sleep(500)
        }

        $("link[href^='/'], script[src^='/']").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href") && $this.attr("href")?.startsWith('//')) {
                $this.attr("href", `https:${$this.attr("href")}`);
            } if ($this.attr("src") && $this.attr("src")?.startsWith('//')) {
                $this.attr("src", `https:${$this.attr("src")}`);
            }
        })

        $("a").each((i, el) => {
            const $this = $(el);
            if ($this.attr("href") && !$this.attr("href").includes('javascript') && !/[\u4e00-\u9fa5]/.test($this.attr("href"))) {
                if ($this.attr("href")?.startsWith('//')){
                    $this.attr("href", `/book?note=${btoa('https:' + $this.attr("href"))}`);
                } else if ($this.attr("href")?.startsWith('/')) {
                    $this.attr("href", `/book?note=${btoa(tUrl.origin + $this.attr("href"))}`);
                } else {
                    $this.attr("href", `/book?note=${btoa($this.attr("href"))}`);
                }
            }
        })

        let result = $.html();
        if (optimisation[target] !== undefined) result = optimisation[target]($, result);
        console.log('[Puppeteer] +Done Getting PageResources');

        let webdata = await write(tUrl.origin, result);
        console.log(`[WebData] ${webdata}`);
        console.log('[Database webdata.db] +Done');

        uservalue.point -= (Date.now() - start) / 1000 + 50;
        await userwrite(username, password, JSON.stringify(uservalue))
        console.log(`=== ${new Date().toDateString()} Task Stop in ${(Date.now() - start) / 1000} s ===`);;
        return { ok: true, resolve: true, error: null, webdata, point: uservalue.point };
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


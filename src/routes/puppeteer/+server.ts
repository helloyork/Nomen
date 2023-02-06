//@ts-nocheck

import { run } from "$lib/puppeteer.webdriver.js";

export async function POST({ request }) {
    let value = await request.json();
    if (value.url && value.username && value.accessKey) {
        return new Response(JSON.stringify(await run(value.username,value.accessKey,value.url)))
    } else return new Response(JSON.stringify({ ok: false, resolve: false, error: '用户数据或资源地址缺失', result: null, }))
}

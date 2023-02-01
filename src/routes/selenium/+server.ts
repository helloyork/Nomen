import { run } from "$lib/user.webdriver.js";

//@ts-ignore
export async function POST({ request }) {
    let value = await request.json();
    if (value.url && value.username && value.accessKey) {
        return new Response(JSON.stringify(await run(value.username,value.accessKey,value.url)))
    } else return new Response(JSON.stringify({ ok: false, resolve: false, error: 'Missing Field', result: null, }))
}

// @ts-nocheck

import axios from "axios";
import cheerio from "cheerio";

/*

axios
["constructor","request","getUri","delete","get","head","options","post","postForm","put","putForm","patch","patchForm",
"defaults","interceptors","create","Axios","CanceledError","CancelToken","isCancel","VERSION","toFormData","AxiosError",
"Cancel","all","spread","isAxiosError","mergeConfig","AxiosHeaders","formToJSON","HttpStatusCode","default"]

Cheerio
["contains","html","merge","parseHTML","root","text","xml","load","_root","_options","fn"]

*/

function sleep(ms) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms))
}

export async function GET() {
    return new Response(JSON.stringify(await go('https://example.com')));
}

async function go(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let result = $('body').html();

    // let spaceList = ['/%22', '%22'];
    // for (let i = 0; i < spaceList.length; i++) {
        // result = result.split(spaceList[i]).join('')
    // }

    console.log(result);
    return result;
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

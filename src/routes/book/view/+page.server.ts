import { view,clear } from "$lib/webdata/webdata";

/** @type {import('./$types').PageLoad} */
export async function load() {
    let result = await view();
    return result;
}
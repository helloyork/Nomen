import { read } from "$lib/webdata/webdata";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let result = await read(params.slug);
    if (result && result.length) return {
        resolve:true,
        content: result[0].content,
        org:result[0].origin,
        slug:params.slug
    };
}
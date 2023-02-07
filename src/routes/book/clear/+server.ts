import { clear } from "$lib/webdata/webdata";

export async function POST({request}){
    let result = await request.json();
    await clear(result.identifier);
    return new Response(JSON.stringify({}));
}

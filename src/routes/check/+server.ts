import { check } from '$lib/identify';

export async function POST({request}){
    let result = await request.json();
    return new Response(JSON.stringify({result:check(result.username,result.accessKey),content:`${result.username} : ${result.accessKey}`}));
}
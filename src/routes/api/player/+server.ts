//@ts-nocheck

import {check} from "$lib/identify";
import user from '$lib/server/spotify.client.json';
import axios from "axios";

export async function POST({request}){
    let result = await request.json();
    return new Response(JSON.stringify({result:check(result.username,result.password)?(await requestAccessToken(user.client,user.key)):false}));
}

async function requestAccessToken(clientId, clientSecret) {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: 'grant_type=client_credentials',
    });
    return response.data.access_token;
}
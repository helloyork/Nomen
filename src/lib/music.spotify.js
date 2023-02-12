// @ts-nocheck

import axios from "axios";

const key = "9eae01bfb3034e33857f7bd9292e845f";
const client = "d21c6e7c8f384e0db7629e948323e6c0";


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

async function searchSongs(query) {
    try {
        return await _getSearchSongsList(await requestAccessToken(client, key), query)
    } catch (error) {
        console.error(error);
    }
}

async function _getSearchSongsList(accessToken, query) {
    try {
        const response = await axios({
            method: "get",
            url: `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data.tracks.items;
    } catch (error) {
        console.error(error);
    }
}

async function getSong(id) {
    try {
        const response = await axios({
            method: "get",
            url: `https://api.spotify.com/v1/tracks/${id}`,
            headers: {
                Authorization: `Bearer ${await requestAccessToken(client, key)}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


(async () => {
    console.log(await getSong((await searchSongs('STAY'))[0].id))
})()

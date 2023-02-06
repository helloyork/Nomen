import axios from "axios";
import fs from "fs"

let url = "https://i1.hdslb.com/bfs/archive/ce87c70291923856a08ab2cf8e26c6d757c32317.jpg@672w_378h_1c_!web-home-common-cover"

axios.get(url, {
    responseType: 'stream',
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.70",
        "Cookie": "",
        "Referer": url,
        "Referrer": url,
        "Content-Type": "text/html"
    }
})
    .then(function (response) {
        response.data.pipe(fs.createWriteStream('./img/img.jpg'));
    })
    .catch(function (error) {
        console.error(error);
    });

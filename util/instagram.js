import axios from "axios";
const BASE_URL = "https://instasupersave.com/";
// npm : fg-ig
export async function instagram(url) {
    try {
        const resp = await axios(BASE_URL);
        const cookie = resp.headers["set-cookie"]; // get cookie from request
        const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=", "").replace("%3D", "");
        const config = {
            method: "post",
            url: `${BASE_URL}api/convert`,
            headers: {
                "origin": "https://instasupersave.com",
                "referer": "https://instasupersave.com/pt/",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52",
                "x-xsrf-token": session,
                "Content-Type": "application/json",
                "Cookie": `XSRF-TOKEN=${session}; instasupersave_session=${session}`,
            },
            data: {
                url,
            },
        };
        // REQUEST
        const response = await axios(config);
        const ig = [];
        if (Array.isArray(response.data)) {
            response.data.forEach((post) => {
                ig.push(post.sd === undefined ? post.thumb : post.sd.url);
            });
        }
        else {
            ig.push(response.data.url[0].url);
        }
        return ig;
    }
    catch (e) {
        return "ERROR";
    }
}

import axios from "axios";
export async function tiktok(query) {
    try {
        const response = await axios("https://lovetik.com/api/ajax/search", {
            method: "POST",
            data: new URLSearchParams(Object.entries({ query })),
        });
        const caption = `${response.data.desc} + ${response.data.author}`;
        return { caption, noWM: response.data.links[0].a, WM: response.data.links[1].a };
    }
    catch (e) {
        return "ERROR";
    }
}

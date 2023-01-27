import { tiktok } from "../../util/tiktok.js";
import axios from "axios";
export async function run(client, message) {
    const { args } = client.parseMessage(message);
    const resTiktok = await tiktok(args[0]);
    if (typeof resTiktok === "string") {
        return client.clientInstances.sendText(message.chatId, "Error has been found");
    }
    client.clientInstances?.sendFile(message.chatId, bufferToDataUrl("video/mp4", (await getVideo(resTiktok.noWM))), "tiktok.mp4", resTiktok.caption);
}
function bufferToDataUrl(mimetype, buffer) {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}
async function getVideo(url) {
    try {
        const response = await axios({
            method: "get",
            url: url,
            responseType: "arraybuffer",
        });
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
}
export const name = "tiktok";
export const description = "download tiktok content";
export const alias = ["ttdl", "tikdl"];

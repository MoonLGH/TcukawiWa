import { decryptMedia } from "@open-wa/wa-automate";
import fs from "fs";
import axios from "axios";
import sagiri from "sagiri";
import "dotenv/config";
export async function run(client, message) {
    if (!process.env.Sauce_API)
        return console.log("you would need sauce nao api key for that");
    const { isMedia, quotedMsg } = message;
    const isQuotedImage = quotedMsg && quotedMsg.type === "image";
    if (!isMedia && !isQuotedImage)
        return client.clientInstances.sendText(message.chatId, "Please send an image");
    const encryptMedia = isQuotedImage ? quotedMsg : message;
    const mediaData = await decryptMedia(encryptMedia);
    const name = randomName();
    writeFile(name, mediaData);
    const sagiriClient = sagiri(process.env.Sauce_API);
    const results = await sagiriClient(`./temp/${name}`);
    if (results.length < 1)
        return client.clientInstances.sendText(message.chatId, "No results found");
    const result = results[0];
    const strings = `Founded with ${result.similarity.toFixed(3)}% similarity\nin ${result.site}\n${result.authorName ? `Author ${result.authorName}\n` : ""}${result.authorUrl ? `Author Url ${result.authorUrl}\n` : ""}${result.url}`;
    const res = await axios.get(result.thumbnail, { responseType: "arraybuffer" });
    const buffer = Buffer.from(res.data, "base64");
    client.clientInstances.sendImage(message.chatId, bufferToDataUrl("image/png", buffer), "result.png", strings);
}
export const name = "sauce";
export const description = "send sauce";
function randomName() {
    const name = `${Math.random().toString(36).substring(2)}.png`;
    return name;
}
function bufferToDataUrl(mimetype, buffer) {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}
function writeFile(name, data) {
    fs.writeFileSync("./temp/" + name, data);
}

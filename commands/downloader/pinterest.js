import { pinterest } from "../../util/pinterest.js";
export async function run(client, message) {
    const { args } = client.parseMessage(message);
    const resPint = await pinterest(args[0]);
    if (resPint === "ERROR")
        return client.clientInstances.sendText(message.chatId, "error");
    client.clientInstances?.sendFileFromUrl(message.chatId, resPint, "pinterest", "pinterest");
}
export const name = "pinterest";
export const description = "download pinterest video/photo";
export const alias = ["pindl"];

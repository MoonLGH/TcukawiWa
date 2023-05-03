import { instagram } from "../../util/instagram.js";
export async function run(client, message) {
    client.clientInstances.sendText(message.chatId, "Please Wait");
    const { args } = client.parseMessage(message);
    for (let i = 0; i < args.length; i++) {
        const element = args[i];
        if (element.toLowerCase().includes("instagram")) {
            const resInsta = await instagram(element);
            if (typeof resInsta === "string") {
                return client.clientInstances.sendText(message.chatId, "Error has been found");
            }
            for (let i = 0; i < resInsta.media.length; i++) {
                const element = resInsta.media[i];
                // element is url, fetch element to buffer using axios
                client.clientInstances?.sendFileFromUrl(message.chatId, element, "instagram", "instagram");
            }
        }
    }
}
export const name = "instagram";
export const description = "download instagram content";
export const alias = ["igdl", "ig"];

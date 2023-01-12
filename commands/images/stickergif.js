import { decryptMedia } from "@open-wa/wa-automate";
export async function run(client, message) {
    const isQuotedGif = message.quotedMsg && message.quotedMsg.mimetype === "image/gif";
    const isQuotedVideo = message.quotedMsg && message.quotedMsg.type === "video";
    if (message.isMedia && message.type === "video" || message.mimetype === "image/gif") {
        try {
            const mediaData = await decryptMedia(message);
            await client.clientInstances.sendMp4AsSticker(message.chatId, mediaData, { fps: 24, startTime: "00:00:00.0", endTime: "00:00:05.0", loop: 0 });
        }
        catch (err) {
            console.error(err);
            await client.clientInstances.reply(message.from, "Something Error", message.id);
        }
    }
    else if (isQuotedGif || isQuotedVideo) {
        try {
            const mediaData = await decryptMedia(message.quotedMsg);
            await client.clientInstances.sendMp4AsSticker(message.chatId, mediaData, { fps: 24, startTime: "00:00:00.0", endTime: "00:00:05.0", loop: 0 });
        }
        catch (err) {
            await client.clientInstances.reply(message.from, "Video Limit exceed", message.id);
        }
    }
    else {
        await client.clientInstances.reply(message.from, "Heh salah format", message.id);
    }
}
export const name = "stickergif";
export const description = "stickerify stuff from a gif/video";
export const alias = ["stikergif", "animatesticker"];

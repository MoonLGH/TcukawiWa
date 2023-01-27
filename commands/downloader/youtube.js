import ytdl from "ytdl-core";
export async function run(client, message) {
    const { args } = client.parseMessage(message);
    if (args.length < 1)
        return client.clientInstances.sendText(message.chatId, "Please provide a youtube url");
    if (!ytdl.validateURL(args[0]))
        return client.clientInstances.sendText(message.chatId, "Please provide a youtube url");
    try {
        const info = await ytdl.getBasicInfo(args[0]);
        const title = info.videoDetails.title;
        const bufs = [];
        const stream = ytdl(args[0], { filter: (format) => format.container === "mp4" });
        stream.on("data", (chunk) => {
            bufs.push(chunk);
        });
        stream.on("end", () => {
            const buf = Buffer.concat(bufs);
            client.clientInstances?.sendImage(message.chatId, bufferToDataUrl("video/mp4", buf), title + ".mp4", "here u go");
        });
    }
    catch (err) {
        return client.clientInstances.sendText(message.chatId, "Error has been found");
    }
}
function bufferToDataUrl(mimetype, buffer) {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}
export const name = "youtube";
export const description = "download youtube video";
export const alias = ["ytdl"];

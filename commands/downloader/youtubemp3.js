import ytdl from "ytdl-core";
export async function run(client, message) {
    const { args } = client.parseMessage(message);
    if (args.length < 1)
        return client.clientInstances.sendText(message.chatId, "Please provide a youtube url");
    if (!ytdl.validateURL(args[0]))
        return client.clientInstances.sendText(message.chatId, "Please provide a youtube url");
    try {
        let info = await ytdl.getBasicInfo(args[0]);
        let title = info.videoDetails.title;
        let bufs = [];
        // let stream = ytdl audionly
        let stream = ytdl(args[0], { filter: "audioonly" });
        stream.on('data', (chunk) => {
            bufs.push(chunk);
        });
        stream.on('end', () => {
            let buf = Buffer.concat(bufs);
            client.clientInstances?.sendPtt(message.chatId, bufferToDataUrl("audio/mp3", buf), message.id);
        });
    }
    catch (err) {
        return client.clientInstances.sendText(message.chatId, "Error has been found");
    }
}
function bufferToDataUrl(mimetype, buffer) {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
}
export const name = "youtubemp3";
export const description = "download youtube video";
export const alias = ["ymp3", "ytdlmp3"];

import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import ytdl from "ytdl-core";
export async function run(client:Client, message:Message) {
  const {args} = client.parseMessage(message);

  if (args.length < 1) return client.clientInstances!.sendText(message.chatId, "Please provide a youtube url");
  if (!ytdl.validateURL(args[0])) return client.clientInstances!.sendText(message.chatId, "Please provide a youtube url");
  try {
    const bufs:Uint8Array[] = [];
    // let stream = ytdl audionly
    const stream = ytdl(args[0], {filter: "audioonly"});
    stream.on("data", (chunk) => {
      bufs.push(chunk);
    });
    stream.on("end", () => {
      const buf = Buffer.concat(bufs);
      client.clientInstances?.sendPtt(message.chatId, bufferToDataUrl("audio/mp3", buf), message.id);
    });
  } catch (err) {
    return client.clientInstances!.sendText(message.chatId, "Error has been found");
  }
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
}

export const name = "youtubemp3";
export const description = "download youtube video";
export const alias = ["ymp3", "ytdlmp3"];

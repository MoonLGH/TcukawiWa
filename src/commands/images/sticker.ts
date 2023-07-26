import {decryptMedia, Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
export async function run(client:Client, message:Message) {
  const {isMedia, mimetype, quotedMsg} = message;
  const isQuotedImage = quotedMsg && quotedMsg.type === "image";
  const {args} = client.parseMessage(message);

  if (isMedia || isQuotedImage) {
    const encryptMedia = isQuotedImage ? quotedMsg : message;
    const _mimetype = isQuotedImage ? quotedMsg!.mimetype : mimetype;
    const mediaData = await decryptMedia(encryptMedia);
    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString("base64")}`;
    await client.clientInstances!.sendImageAsSticker(message.chatId, imageBase64, {author: args[0]||"author", pack: args[1]||"pack", keepScale: true});
  } else {
    client.clientInstances!.sendText(message.chatId, "No Media");
  }
}

export const name = "sticker";
export const description = "stickerify stuff";
export const alias = ["stiker", "s"];

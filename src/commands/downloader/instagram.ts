import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import {instagram} from "../../util/instagram.js"
export async function run(client:Client, message:Message) {
  const {args} = client.parseMessage(message);
  const resInsta = await instagram(args[0]);
  if(typeof resInsta === "string"){
    return client.clientInstances!.sendText(message.chatId,"Error has been found")
  }
  
  for (let i = 0; i < resInsta.length; i++) {
    const element:string = resInsta[i];
    // element is url, fetch element to buffer using axios
    client.clientInstances?.sendFileFromUrl(message.chatId,element,"instagram","instagram")
  }
}

export const name = "instagram";
export const description = "download instagram content";
export const alias = ["igdl","ig"];

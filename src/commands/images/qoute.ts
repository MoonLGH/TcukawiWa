import { Contact, Message, StickerMetadata } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";
import axios from "axios";
export async function run(client: Client, message: Message) {
  const { quotedMsg } = message;

  if(!quotedMsg && message.text.length < 5) return client.clientInstances?.sendText(message.chatId,"put something m8")
  if (quotedMsg) {
    let pic
    try {
      let b64 = await client.clientInstances!.downloadFileWithCredentials(quotedMsg.sender.profilePicThumbObj.imgFull).catch(
        ()=>
        `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
      )
      console.log(b64)
      if(b64 !== `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`){
        pic = await upload(b64)
      } else {
        pic = b64
      }
    } catch (err) {
      pic = `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
    }

    let jsonstik = {
      type: "quote",
      format: "webp",
      backgroundColor: "#FFFFFF",
      width: 1000,
      height: 1000,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: getName(quotedMsg.sender),
            photo: {
              url: pic
            },
          },
          text: quotedMsg.text,
          replyMessage: {},
        },
      ],
    };

    console.log(jsonstik.messages[0].from.photo)
    let res = await axios.post(
      "https://bot.lyo.su/quote/generate",
      jsonstik,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    const buffer = Buffer.from(res.data.result.image, "base64");
    client.clientInstances?.sendImageAsSticker(message.chatId,buffer,({
      keepScale:true
    } as StickerMetadata))
  } else {
    let pic
    try {
      let b64 = await client.clientInstances!.downloadFileWithCredentials(message.sender.profilePicThumbObj.imgFull).catch(
        ()=>
        `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
      )
      console.log(b64)
      if(b64 !== `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`){
        pic = await upload(b64)
      } else {
        pic = b64
      }
    } catch (err) {
      pic = `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
    }

    let {args} = client.parseMessage(message)
    let jsonstik = {
      type: "quote",
      format: "webp",
      backgroundColor: "#FFFFFF",
      width: 1000,
      height: 1000,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: getName(message.sender),
            photo: {
              url: pic,
            },
          },
          text: args.join(" "),
          replyMessage: {},
        },
      ],
    };

    console.log(jsonstik.messages[0].from.photo)
    let res = await axios.post(
      "https://bot.lyo.su/quote/generate",
      jsonstik,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    const buffer = Buffer.from(res.data.result.image, "base64");
    client.clientInstances?.sendImageAsSticker(message.chatId,buffer,({
      keepScale:true
    } as StickerMetadata))
  }

}


async function upload(b64:string, tries?:number){
    console.log(b64)
    try {
      let res = await axios.post('https://image-production-a0af.up.railway.app/upload', {image:b64})
      return `https://image-production-a0af.up.railway.app/file/file/${res.data.id}.png`
    } catch (err) {
      return `https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`
    }
}

export const name = "quote";
export const description = "quote a message to be a sticker";
export const alias = ["qc"];


function getName(contact: Contact) {
  const { pushname, formattedName, verifiedName,name } = contact;
  if(contact.isMe){
    return "Yang Mulia"
  }
  return name || pushname || verifiedName || formattedName;
}
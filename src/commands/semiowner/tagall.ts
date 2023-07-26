import {Contact, ContactId, Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client.js";
export async function run(client: Client, message: Message) {
  const semiowner = await client.semiOwnerList()!;
  if (semiowner!.includes(message.sender.id) || message.fromMe) {
    if (!message.isGroupMsg) {
      return client.clientInstances!.sendText(message.chatId, "This command only works on group chats");
    }
    client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message)} Has Called You`, message.id, true, (message.chat.groupMetadata.participants.map((p) => p.id) as unknown as ContactId[]));
  } else {
    return client.clientInstances!.sendText(message.chatId, "You Need to be semi owner or higher");
  }
}


export const name = "tagall";

function getName(msg: Message) {
  const {pushname, formattedName, verifiedName, name} = msg.sender as Contact;
  if (msg.fromMe) {
    return "Yang Mulia";
  }
  return name || pushname || verifiedName || formattedName;
}

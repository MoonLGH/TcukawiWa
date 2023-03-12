import {Contact, ContactId, Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";

export function run(client:Client, message:Message) {
  if (!message.fromMe || (client.semiOwner && client.semiOwner.includes(message.sender.id))) return client.clientInstances!.sendText(message.chatId, "You must be semi owner to use this command");

  client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message.sender)} Has Called You`, message.id, true, (message.chat.groupMetadata.participants.map((p) => p.id) as unknown as ContactId[]));
}

export const name = "tagall";

function getName(contact: Contact) {
  const { pushname, formattedName, verifiedName,name } = contact;
  if(contact.isMe){
    return "Yang Mulia"
  }
  return name || pushname || verifiedName || formattedName;
}
import {Contact, ContactId, Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";

export function run(client:Client, message:Message) {
  if (!message.fromMe) return client.clientInstances!.sendText(message.chatId, "No");
  if(message.mentionedJidList.length < 1) {
    return client.clientInstances!.sendText(message.chatId, "Please mention the user");
  }
  if(message.body.includes("-del")){
    const mentioned = message.mentionedJidList[0];
    client.removeSemiOwner(mentioned);
    return client.clientInstances!.sendText(message.chatId, "Removed from semi owner list");
  } else{
    const mentioned = message.mentionedJidList[0];
    client.addSemiOwner(mentioned);
    return client.clientInstances!.sendText(message.chatId, "Added to semi owner list");
  }
}

export const name = "semi";

function getName(contact: Contact) {
  const { pushname, formattedName, verifiedName,name } = contact;
  if(contact.isMe){
    return "Yang Mulia"
  }
  return name || pushname || verifiedName || formattedName;
}
import { Contact, ContactId, Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";

export function run(client: Client, message: Message) {
    // check if the message is from a semi owner
    if (client.semiOwner?.includes(message.sender.id) || message.fromMe) {
        if (!message.isGroupMsg) {
            return client.clientInstances!.sendText(message.chatId, "This command only works on group chats");
        }
        client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message.sender)} Has Called You`, message.id, true, (message.chat.groupMetadata.participants.map((p) => p.id) as unknown as ContactId[]));
    } else {
        return client.clientInstances!.sendText(message.chatId, "You Need to be semi owner or higher");
    }
}


export const name = "tagall";

function getName(contact: Contact) {
    const { pushname, formattedName, verifiedName, name } = contact;
    if (contact.isMe) {
        return "Yang Mulia"
    }
    return name || pushname || verifiedName || formattedName;
}
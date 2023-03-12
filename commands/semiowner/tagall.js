export function run(client, message) {
    // check if the message is from a semi owner
    if (client.semiOwner?.includes(message.sender.id) || message.fromMe) {
        if (!message.isGroupMsg) {
            return client.clientInstances.sendText(message.chatId, "This command only works on group chats");
        }
        client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message.sender)} Has Called You`, message.id, true, message.chat.groupMetadata.participants.map((p) => p.id));
    }
    else {
        return client.clientInstances.sendText(message.chatId, "You Need to be semi owner or higher");
    }
}
export const name = "tagall";
function getName(contact) {
    const { pushname, formattedName, verifiedName, name } = contact;
    if (contact.isMe) {
        return "Yang Mulia";
    }
    return name || pushname || verifiedName || formattedName;
}

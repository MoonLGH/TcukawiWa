export function run(client, message) {
    if (!message.fromMe || (client.semiOwner && client.semiOwner.includes(message.sender.id)))
        return client.clientInstances.sendText(message.chatId, "You must be semi owner to use this command");
    client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message.sender)} Has Called You`, message.id, true, message.chat.groupMetadata.participants.map((p) => p.id));
}
export const name = "tagall";
function getName(contact) {
    const { pushname, formattedName, verifiedName, name } = contact;
    if (contact.isMe) {
        return "Yang Mulia";
    }
    return name || pushname || verifiedName || formattedName;
}

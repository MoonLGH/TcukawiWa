export async function run(client, message) {
    const semiowner = await client.semiOwnerList();
    if (semiowner.includes(message.sender.id) || message.fromMe) {
        if (!message.isGroupMsg) {
            return client.clientInstances.sendText(message.chatId, "This command only works on group chats");
        }
        client.clientInstances?.sendReplyWithMentions(message.chatId, `${getName(message)} Has Called You`, message.id, true, message.chat.groupMetadata.participants.map((p) => p.id));
    }
    else {
        return client.clientInstances.sendText(message.chatId, "You Need to be semi owner or higher");
    }
}
export const name = "tagall";
function getName(msg) {
    const { pushname, formattedName, verifiedName, name } = msg.sender;
    if (msg.fromMe) {
        return "Yang Mulia";
    }
    return name || pushname || verifiedName || formattedName;
}

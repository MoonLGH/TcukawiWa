export function run(client, message) {
    if (!message.fromMe)
        return client.clientInstances.sendText(message.chatId, "No");
    if (message.body.toLowerCase().includes("-off")) {
        client.setWhitelist(false, false);
        return client.clientInstances.sendText(message.chatId, "Whitelist Mode Turned off");
    }
    if (message.body.toLowerCase().includes("-soft")) {
        client.setWhitelist(true, true);
    }
    else {
        client.setWhitelist(true);
    }
    return client.clientInstances.sendText(message.chatId, "Whitelist Mode Activated");
}
export const name = "setwhitelist";

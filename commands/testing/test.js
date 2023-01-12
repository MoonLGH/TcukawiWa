export function run(client, message) {
    return client.clientInstances.sendText(message.chatId, "Pong!");
}
export const name = "test";

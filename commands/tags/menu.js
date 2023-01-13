export async function run(client, message) {
    client.clientInstances.sendText(message.chatId, "To see the commands list, please go to https://tcukawi.tech/Tcukawi-WebCommands/commands/");
}
export const name = "menu";
export const description = "Commands Menu or redirecting to web";
export const alias = ["help"];

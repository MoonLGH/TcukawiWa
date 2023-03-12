import moment from "moment-timezone";
export function run(client, message) {
    const now = moment();
    const timezone = 'GMT+7';
    const runtimeSeconds = Math.floor(process.uptime());
    const runtimeDays = Math.floor(runtimeSeconds / 86400);
    const runtimeHours = Math.floor(runtimeSeconds % 86400 / 3600);
    const runtimeMinutes = Math.floor(runtimeSeconds % 3600 / 60);
    const runtimeSecondsFinal = runtimeSeconds % 60;
    const messageText = `≻ Hello ${getName(message.sender)}
    ≻ Date: ${now.tz(timezone).format('YYYY-MM-DD')}
    ≻ Time: ${now.tz(timezone).format('HH:mm:ss')}
    ≻ Runtime: ${runtimeDays} days, ${runtimeHours} hours, ${runtimeMinutes} minutes, and ${runtimeSecondsFinal} seconds.
    ≻ Note: Times are relative to ${timezone}.
    ≻ For a list of available commands, please visit https://tcukawi.tech/Tcukawi-WebCommands/commands/`;
    client.clientInstances.sendText(message.chatId, messageText);
}
export const name = "uptime";
export const alias = ["info", "botInfo"];
function getName(contact) {
    const { pushname, formattedName, verifiedName, name } = contact;
    if (contact.isMe) {
        return "Yang Mulia";
    }
    return name || pushname || verifiedName || formattedName;
}

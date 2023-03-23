import moment from "moment-timezone";
import os from "os";
export function run(client, message) {
    const now = moment();
    const timezone = "Asia/Jakarta";
    const runtimeSeconds = Math.floor(process.uptime());
    const runtimeDays = Math.floor(runtimeSeconds / 86400);
    const runtimeHours = Math.floor(runtimeSeconds % 86400 / 3600);
    const runtimeMinutes = Math.floor(runtimeSeconds % 3600 / 60);
    const runtimeSecondsFinal = runtimeSeconds % 60;
    let messageText = `
    ≻ Hello ${getName(message.sender)}
    
    ≻ Date: ${now.tz(timezone).format("YYYY-MM-DD")}
    ≻ Time: ${now.tz(timezone).format("HH:mm:ss")}
    ≻ Runtime: ${runtimeDays} days, ${runtimeHours} hours, ${runtimeMinutes} minutes, and ${runtimeSecondsFinal} seconds.
    
    ≻ Note: Times are relative to ${timezone}.
    
    ≻ For a list of available commands, please visit https://tcukawi.tech/Tcukawi-WebCommands/commands/
    ≻ For the Bot source code, is opensource on https://github.com/MoonLGH/TcukawiWa, feel free to contribute
    
    `;
    messageText += `
≻ System OS Configuration:
    ≻ OS Type: ${os.type()}
    ≻ OS Platform: ${os.platform()}
    ≻ OS Release: ${os.release()}
    ≻ CPU Architecture: ${os.arch()}
    ≻ Total Memory: ${Math.round(os.totalmem() / (1024 ** 3))} GB
    ≻ Free Memory: ${Math.round(os.freemem() / (1024 ** 3))} GB
`;
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

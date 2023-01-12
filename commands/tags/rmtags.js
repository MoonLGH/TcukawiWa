import { model } from "../../util/db/model/tags.js";
export async function run(client, message) {
    const parse = client.parseMessage(message);
    const args = [...parse.args];
    const key = args[0];
    const data = await model.findOne({ key: key });
    if (!data) {
        return client.clientInstances?.sendText(message.chatId, `${key} is not founded`);
    }
    if (!message.fromMe && data.isGlobal) {
        return client.clientInstances?.sendText(message.chatId, `${key} is founded but you cant remove global tags`);
    }
    if (data.isGroup && (data.groupName === message.from)) {
        await data.remove();
        return client.clientInstances?.sendText(message.chatId, `${key} is successfully removed from the group`);
    }
    if (message.fromMe) {
        await data.remove();
        return client.clientInstances?.sendText(message.chatId, `${key} is successfully removed from the ${data.isGroup ? "Group" : ""} ${data.isGlobal ? "Global" : ""}`);
    }
    return client.clientInstances?.sendText(message.chatId, "Failed to do stuff");
}
export const name = "rmtags";

import { model } from "../../util/db/model/tags.js";
export async function run(client, message) {
    const parse = ParseTagsFormat(message.body);
    const args = [...parse.newArr];
    const key = args.shift();
    const find = await model.find();
    if (!message.isGroupMsg && !message.fromMe) {
        return client.clientInstances?.sendText(message.chatId, "No you cant do that");
    }
    if (!key || args.length < 1) {
        return client.clientInstances?.sendText(message.chatId, "No");
    }
    for (const obj of find) {
        if (obj.key.toLowerCase().includes(key.toLowerCase()) || obj.value.toLowerCase().includes(key.toLowerCase())) {
            return client.clientInstances?.sendText(message.chatId, "duplicates found");
        }
    }
    if (args.join(" ").toLowerCase().includes(key.toLowerCase())) {
        return client.clientInstances?.sendText(message.chatId, "duplicates found");
    }
    let groupName;
    if (parse.isGroup || !message.fromMe) {
        groupName = message.chatId.split("-")[0];
    }
    const options = {
        key: key.toLowerCase(),
        value: args.join(" "),
        isGlobal: !(message.fromMe && parse.isGroup),
        isGroup: (parse.isGroup || !message.fromMe),
        groupName: groupName,
    };
    const newModel = new model(options);
    await newModel.save();
    client.logger(`Tag saved as ${options.key}`, "Tags");
    return client.clientInstances.sendText(message.chatId, `${options.key} Saved on ${options.isGlobal ? "Global" : ""} ${options.isGroup ? "Group with group of This group" : ""} `);
}
function ParseTagsFormat(text) {
    const arr = text.split(" ");
    // Only used so new args didnt get into the tags value
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const commands = arr.shift();
    const newArr = [];
    let isGroup = false;
    let isGlobal = false;
    for (const Str of arr) {
        if (Str.toLowerCase() === "-isgroup") {
            isGroup = true;
            isGlobal = false;
        }
        else if (Str.toLowerCase() === "-isglobal") {
            isGlobal = true;
        }
        else {
            newArr.push(Str);
        }
    }
    return { isGlobal, isGroup, newArr };
}
export const name = "addtags";

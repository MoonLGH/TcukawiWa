// create jitakcount variable with string: number type
let jitakCount = {};
export async function run(client, message) {
    if (!message.fromMe)
        return client.clientInstances?.sendText(message.chatId, "you are not me");
    if (message.body.includes("-leaderboard")) {
        const sorted = Object.entries(jitakCount).sort((a, b) => b[1] - a[1]);
        const text = sorted.map((x) => `${x[0]}: ${x[1]}`).join("\n");
        client.clientInstances?.sendText(message.chatId, `Jitak Leaderboard:\n\n${text}`);
        return;
    }
    if (message.body.includes("-resetall")) {
        jitakCount = {};
        return client.clientInstances?.sendText(message.chatId, "Jitak count resetted");
    }
    if (!message.body.includes("-person:")) {
        if (!jitakCount["aya"]) {
            jitakCount["aya"] = 0;
        }
        jitakCount["aya"]++;
        client.clientInstances?.sendText(message.chatId, `aya Jitak count: ${jitakCount["aya"]}`);
    }
    else if (message.body.includes("-person:")) {
        const person = message.body.split("-person:")[1].split(" ")[0];
        if (!jitakCount[person]) {
            jitakCount[person] = 0;
        }
        if (message.body.includes("-del")) {
            jitakCount[person]--;
        }
        else {
            jitakCount[person]++;
        }
        if (message.body.includes("-reset")) {
            jitakCount[person] = 0;
        }
        client.clientInstances?.sendText(message.chatId, `${person} Jitak count: ${jitakCount[person]}`);
    }
}
export const name = "jitak";
export const description = "#Custom Command";
export const alias = ["stopgws"];

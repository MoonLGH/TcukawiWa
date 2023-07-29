import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
// create jitakcount variable with string: number type
let jitakCount:Record<string, number> = {};

export async function run(client:Client, message:Message) {
  if (!message.body.includes("-person:")) {
    if (!jitakCount["aya"]) {
      jitakCount["aya"] = 0;
    }
    jitakCount["aya"]++;
    client.clientInstances?.sendText(message.chatId, `Aya Jitak count: ${jitakCount["aya"]}`);
  }
  if (message.body.includes("-person:")) {
    const person = message.body.split("-person:")[1].split(" ")[0];
    if (!jitakCount[person]) {
      jitakCount[person] = 0;
    }
    if (message.body.includes("-del")) {
      jitakCount[person]--;
    } else {
      jitakCount[person]++;
    }
    if (message.body.includes("-reset")) {
      jitakCount[person] = 0;
    }
    client.clientInstances?.sendText(message.chatId, `${person} Jitak count: ${jitakCount[person]}`);
  }

  if (message.body.includes("-resetAll")) {
    jitakCount = {};
  }

  if (message.body.includes("-leaderboard")) {
    const sorted = Object.entries(jitakCount).sort((a, b) => b[1] - a[1]);
    const text = sorted.map((x) => `${x[0]}: ${x[1]}`).join("\n");
    client.clientInstances?.sendText(message.chatId, `Jitak Leaderboard:\n\n${text}`);
  }
}


export const name = "jitak";
export const description = "#Custom Command";
export const alias = ["stopgws"];

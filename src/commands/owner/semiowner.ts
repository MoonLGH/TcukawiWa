import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client.js";
import {model} from "../../util/db/model/semiowner.js";

export function run(client:Client, message:Message) {
  if (!message.fromMe) return client.clientInstances!.sendText(message.chatId, "No");
  if (message.mentionedJidList.length < 1) {
    return client.clientInstances!.sendText(message.chatId, "Please mention the user");
  }

  if (client.MongoUrl) {
    const mentioned = message.mentionedJidList[0];
    if (message.body.includes("-del")) {
      model.findOneAndDelete({numberId: mentioned}).then((res) => {
        if (res) {
          return client.clientInstances!.sendText(message.chatId, "Removed from semi owner list Database");
        } else {
          return client.clientInstances!.sendText(message.chatId, "User is not in the semi owner list");
        }
      });
    } else {
      model.findOne({numberId: mentioned}).then((res) => {
        if (res) {
          return client.clientInstances!.sendText(message.chatId, "User is already in the semi owner list");
        } else {
          const newSemi = new model({
            numberId: mentioned,
          });
          newSemi.save().then(() => {
            return client.clientInstances!.sendText(message.chatId, "Added to semi owner list Database");
          });
        }
      });
    }
  }
  if (message.body.includes("-del")) {
    const mentioned = message.mentionedJidList[0];
    client.removeSemiOwner(mentioned);
    return client.clientInstances!.sendText(message.chatId, "Removed from semi owner list");
  } else {
    const mentioned = message.mentionedJidList[0];
    client.addSemiOwner(mentioned);
    return client.clientInstances!.sendText(message.chatId, "Added to semi owner list");
  }
}

export const name = "semi";

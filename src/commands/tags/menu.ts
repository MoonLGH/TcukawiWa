import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";

export async function run(client:Client, message:Message) {
    client.clientInstances!.sendText(message.chatId, "To see the commands list, please go to https://tsukari.tech/Tcukawi-WebCommands/commands/");
}

export const name = "menu";
export const description = "Commands Menu or redirecting to web";
export const alias = ["help"];

import { inspect } from "util";
import ts from "typescript";
export async function run(client, message) {
    if (!message.fromMe)
        return client.clientInstances.sendText(message.chatId, "you are not me");
    const { args } = client.parseMessage(message);
    if (args.length === 0) {
        return client.clientInstances.sendText(message.chatId, "Please enter a code");
    }
    try {
        const matches = args.join(" ").match(/```(?:(?<lang>\S+)\n)?\s?(?<code>[^]+?)\s?```/)?.groups;
        let coded = matches.code;
        if (matches.lang && matches.lang.toLowerCase() === "ts") {
            coded = ts.transpile(matches.code);
        }
        let evaled = eval(coded);
        const raw = evaled;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let promise;
        let output;
        let bin;
        let type;
        if (evaled instanceof Promise) {
            // eslint-disable-next-line prefer-const
            promise = await evaled
                .then((res) => {
                return { resolved: true, body: inspect(res, { depth: 0 }) };
            })
                .catch((err) => {
                return { rejected: true, body: inspect(err, { depth: 0 }) };
            });
        }
        if (typeof evaled !== "string") {
            evaled = inspect(evaled, { depth: 0 });
        }
        if (promise) {
            output = clean(promise.body);
        }
        else {
            output = clean(evaled);
        }
        if (promise?.resolved) {
            type = "Promise (Resolved)";
        }
        else if (promise?.rejected) {
            type = "Promise (Rejected)";
        }
        else {
            type = (typeof raw).charAt(0).toUpperCase() + (typeof raw).slice(1);
        }
        if (output.length > 1000) {
            await fetch("https://hastebin.com/documents", {
                method: "POST",
                body: output,
                headers: { "Content-Type": "text/plain" },
            }).then((res) => res.json())
                .then((json) => bin = "https://hastebin.com/" + json.key + ".js")
                .catch(() => null);
        }
        const str = output.length > 1000 ? bin : output;
        client.clientInstances.sendText(message.chatId, str);
        return client.clientInstances.sendText(message.chatId, `Returned type of ${type}`);
    }
    catch (err) {
        return client.clientInstances.sendText(message.chatId, `${err.name}\n${err.stack}`);
    }
}
export const name = "eval";
export const description = "Eval a javascript code (owner)";
function clean(text) {
    return String(text).replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
}

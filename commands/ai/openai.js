import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
export async function run(client, message) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const { args } = client.parseMessage(message);
    if (args.length > 0) {
        if (args.join(" ").includes("eval") && !message.fromMe) {
            client.clientInstances.sendText(message.chatId, "opini bagus, eval blocked from ai");
            return;
        }
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: args.join(" "),
            temperature: 0.8,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log(completion.data.choices);
        console.log(completion.data.id);
        client.clientInstances.sendText(message.chatId, completion.data.choices[0].text);
    }
    else {
        client.clientInstances.sendText(message.chatId, "enter question");
    }
}
export const name = "openai";
export const description = "Ask bot powered by gpt3";
export const alias = ["ask", "ai", "tanya", "bot"];

import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";
export async function run(client, message) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const { args } = client.parseMessage(message);
    if (args.length > 0) {
        const response = await openai.createImage({
            prompt: args.join(" "),
            n: 1,
            size: "1024x1024",
        });
        const image_url = response.data.data[0].url;
        client.clientInstances?.sendFileFromUrl(message.chatId, image_url, `${args.join(" ")}.jpg`, "here you go");
    }
    else {
        client.clientInstances.sendText(message.chatId, "enter question");
    }
}
export const name = "genimage";
export const description = "Ask bot powered by dall-e to generate image";
export const alias = ["imageai"];

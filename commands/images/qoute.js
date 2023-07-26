import axios from "axios";
export async function run(client, message) {
    const { quotedMsg } = message;
    if (!quotedMsg && message.text.length < 5)
        return client.clientInstances?.sendText(message.chatId, "put something m8");
    if (quotedMsg) {
        let pic;
        try {
            const b64 = await client.clientInstances.downloadFileWithCredentials(quotedMsg.sender.profilePicThumbObj.imgFull).catch(() => "http://www.gravatar.com/avatar/?d=mp");
            console.log(b64);
            if (b64 !== "http://www.gravatar.com/avatar/?d=mp") {
                pic = await upload(b64);
            }
            else {
                pic = b64;
            }
        }
        catch (err) {
            pic = "http://www.gravatar.com/avatar/?d=mp";
        }
        const jsonstik = {
            type: "quote",
            format: "webp",
            backgroundColor: "#FFFFFF",
            width: 1000,
            height: 1000,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: getName(quotedMsg),
                        photo: {
                            url: pic,
                        },
                    },
                    text: quotedMsg.text,
                    replyMessage: {},
                },
            ],
        };
        console.log(jsonstik.messages[0].from.photo);
        const res = await axios.post("https://bot.lyo.su/quote/generate", jsonstik, {
            headers: { "Content-Type": "application/json" },
        });
        const buffer = Buffer.from(res.data.result.image, "base64");
        client.clientInstances?.sendImageAsSticker(message.chatId, buffer, {
            keepScale: true,
        });
    }
    else {
        let pic;
        try {
            const b64 = await client.clientInstances.downloadFileWithCredentials(message.sender.profilePicThumbObj.imgFull).catch(() => "http://www.gravatar.com/avatar/?d=mp");
            console.log(b64);
            if (b64 !== "http://www.gravatar.com/avatar/?d=mp") {
                pic = await upload(b64);
            }
            else {
                pic = b64;
            }
        }
        catch (err) {
            pic = "http://www.gravatar.com/avatar/?d=mp";
        }
        const { args } = client.parseMessage(message);
        const jsonstik = {
            type: "quote",
            format: "webp",
            backgroundColor: "#FFFFFF",
            width: 1000,
            height: 1000,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: getName(message),
                        photo: {
                            url: pic,
                        },
                    },
                    text: args.join(" "),
                    replyMessage: {},
                },
            ],
        };
        console.log(jsonstik.messages[0].from.photo);
        const res = await axios.post("https://bot.lyo.su/quote/generate", jsonstik, {
            headers: { "Content-Type": "application/json" },
        });
        const buffer = Buffer.from(res.data.result.image, "base64");
        client.clientInstances?.sendImageAsSticker(message.chatId, buffer, {
            keepScale: true,
        });
    }
}
async function upload(b64) {
    try {
        const res = await axios.post("http://20.222.32.83:7000/upload", { image: b64 });
        return `http://20.222.32.83:7000/file/file/${res.data.id}.png`;
    }
    catch (err) {
        return "http://www.gravatar.com/avatar/?d=mp";
    }
}
export const name = "quote";
export const description = "quote a message to be a sticker";
export const alias = ["qc"];
function getName(msg) {
    const { pushname, formattedName, verifiedName, name } = msg.sender;
    if (msg.fromMe) {
        return "Yang Mulia";
    }
    return name || pushname || verifiedName || formattedName;
}

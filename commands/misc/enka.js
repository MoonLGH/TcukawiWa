import { EnkaNetwork } from "enkanetwork";
const enka = new EnkaNetwork({ language: "EN", caching: true });
export async function run(client, message) {
    const { args } = client.parseMessage(message);
    const get_data_shin = await enkashin(Number(args[0]));
    const teks = `informasi tentang id genshin ini:\nnickname: *${get_data_shin.nickname}*\nSignature: *${get_data_shin.signature}*\nlevel: *${get_data_shin.level}*\nnameCard: *${get_data_shin.nameCard}*\nachievements: *${get_data_shin.achievements}*\nabyssFloor: *${get_data_shin.abyssFloor}*\nabyssLevel: *${get_data_shin.abyssLevel}*`.trim();
    client.clientInstances?.sendText(message.chatId, teks);
}
async function enkashin(id) {
    const user = await enka.fetchUser(id);
    const result = user.player;
    const enka_result = {
        nickname: result.nickname,
        signature: result.signature,
        level: result.level,
        nameCard: result.nameCard,
        achievements: result.achievements,
        abyssFloor: result.abyssFloor,
        abyssLevel: result.abyssLevel,
    };
    return enka_result;
}
export const name = "enka";
export const description = "informasi genshinID";

import { latestGempa } from "../../util/gempa.js";
export async function run(client, message) {
    const gempa = await latestGempa();
    const teks = `informasi gempa terbaru:\n\nWaktu: *${gempa.tanggal} ${gempa.jam}*\nBujur: *${gempa.bujur}*\nLintang: *${gempa.lintang}*\nMagnitudo: *${gempa.magnitude}*\nKedalaman: *${gempa.kedalaman}*\nLokasi: *${gempa.wilayah}*`.trim();
    client.clientInstances?.sendImage(message.chatId, gempa.image, "gempa.jpg", "Foto Satelit");
    client.clientInstances?.sendText(message.chatId, teks);
}
export const name = "gempa";
export const description = "informasi gempa";
export const alias = ["infogempa"];

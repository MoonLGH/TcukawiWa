export async function run(client, message) {
    const data = await fetch("https://apicomtest.kcic.co.id/public/routes?filter[route]=halim-bandung&filter[date][$gte]=2023-10-07T17:00:00.000Z&filter[date][$lte]=2023-10-08T16:59:59.059Z");
    let teks = "";
    const isi = await data.json();
    if (isi.data.length > 0) {
        teks = "Pendaftaran sudah dibuka https://apicomtest.kcic.co.id/public/routes?filter[route]=halim-bandung&filter[date][$gte]=2023-10-07T17:00:00.000Z&filter[date][$lte]=2023-10-08T16:59:59.059Z \n https://ayonaik.kcic.co.id/";
    }
    else {
        teks = "Pendaftaran belum dibuka https://apicomtest.kcic.co.id/public/routes?filter[route]=halim-bandung&filter[date][$gte]=2023-10-07T17:00:00.000Z&filter[date][$lte]=2023-10-08T16:59:59.059Z \n https://ayonaik.kcic.co.id/";
    }
    client.clientInstances?.sendText(message.chatId, teks);
}
export const name = "cektiket";
export const description = "tiket";

import axios from "axios";
export async function latestGempa() {
    const res = await axios("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const result = res.data.Infogempa.gempa;
    const t = {
        tanggal: result.Tanggal,
        jam: result.Jam,
        lintang: result.Lintang,
        bujur: result.Bujur,
        magnitude: result.Magnitude,
        kedalaman: result.Kedalaman,
        potensi: result.Potensi,
        wilayah: result.Wilayah,
        image: "https://data.bmkg.go.id/DataMKG/TEWS/" + result.Shakemap,
    };
    return t;
}

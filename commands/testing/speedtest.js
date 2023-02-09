// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// TODO : DECLARE MODULE
import FastSpeedtest from "fast-speedtest-api";
const speedtest = new FastSpeedtest({
    verbose: false,
    timeout: 10000,
    https: true,
    urlCount: 5,
    bufferSize: 8,
    unit: FastSpeedtest.UNITS.Mbps, // default: Bps
});
export function run(client, message) {
    speedtest.getSpeed().then((s) => {
        client.clientInstances.sendText(message.chatId, `Speed = ${parseInt(s).toFixed()} Mbps`);
    });
    return;
}
export const name = "speedtest";

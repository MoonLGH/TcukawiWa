import axios from "axios";
import * as cheerio from "cheerio";

export async function pinterest(url: string) {
  try {
    const res = await axios.get("https://pinterestvideo.com/", {
      headers: {
        "user-agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
    });

    const $ = cheerio.load(res.data);
    const url_name = $("#downloadForm > input").attr("name");
    const data = {
      [`${url_name}`]: url,
    };

    const respon = await axios.post(
        "https://pinterestvideo.com/downloader.php",
        new URLSearchParams(Object.entries(data)),
        {
          headers: {
            "user-agent":
                  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            "cookie": (res.headers["set-cookie"]?.join(";") as string),
          },
        },
    );

    const chuaks = cheerio.load(respon.data);
    return (chuaks("#dlSection > a").attr("href") as string);
  } catch (error) {
    return "ERROR";
  }
}

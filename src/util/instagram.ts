import axios from "axios";
import {load} from "cheerio";
// from ohsyme/skrep btw

// here is some conversation about this
// me : weh igdl lo gw curi ye
// ohsyme : iyo

export async function instagram(url: string) {
  try {
    const Get_Data = await axios.get(url);
    const Get_Result = Get_Data.data;
    const $ = load(Get_Result);
    const data = JSON.parse($("script").html()!);
    const media = [];
    for (const x of [...data.image, ...data.video]) media.push(x.url || x.contentUrl);
    return {
      caption: data.articleBody, media,
    };
  } catch (e) {
    return "ERROR";
  }
}

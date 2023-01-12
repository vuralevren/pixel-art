import _ from "lodash";
import { auth, endpoint } from "../configs/altogic";
import pixelService from "../redux/pixel/pixelService";
import { pixelActions } from "../redux/pixel/pixelSlice";
import html2canvas from "html2canvas";

function savePallette(slug, pallette) {
  return pixelService.draw(slug, pallette);
}

function savePicture(slug, blob) {
  return pixelService.changePixelPicture(slug, `pixel_${slug}`, blob);
}

onmessage = async ({ data }) => {
  const { slug, pallette, blob } = data;
  try {
    //savePallette(slug, pallette);
    savePicture(slug, blob);
    // const [res1, res2] = await Promise.all([
    //   // savePallette(slug, JSON.stringify(pallette)),
    //   savePicture(slug, blob),
    // ]);
    // postMessage(res2);
  } catch (error) {
    // postMessage(error);
  }
};

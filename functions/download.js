import { saveAs } from "file-saver";

export default function renderFrames(settings) {
  const canvas = document.createElement("canvas");

  const cols = Math.floor(16 / 8);
  let ctx = canvas.getContext("2d");
  ctx.canvas.width = 128;
  ctx.canvas.height = 128;

  ctx = fillCanvasWithFrame(ctx, {
    frame: 120,
    cols,
    cellSize: 120,
    frameHeight: 120,
    frameIdx: 0,
  });

  canvas.toBlob(function (blob) {
    saveCanvasToDisk(blob, "png");
  });
}

const saveCanvasToDisk = (blob, fileExtension) => {
  saveAs(blob, `deneme.${fileExtension}`);
};

function fillCanvasWithFrame(canvas, frameInfo) {
  const { frame, cols, cellSize, frameHeight, frameIdx } = frameInfo;
  const ctx = canvas;
  frame.get("grid").forEach((fillStyle, pixelIdx) => {
    if (!fillStyle) {
      return;
    }
    ctx.fillStyle = fillStyle;

    const col = pixelIdx % cols;
    const row = Math.floor(pixelIdx / cols);
    ctx.fillRect(
      col * cellSize,
      row * cellSize + frameHeight * frameIdx,
      cellSize,
      cellSize
    );
  });
  return ctx;
}

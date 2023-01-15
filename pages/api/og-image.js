import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url || "");
  const link = searchParams.get("link");
  const name = searchParams.get("name");

  if (!link) {
    return new Response("Missing link", { status: 400 });
  }

  return new ImageResponse(
    (
      <section
        style={{ backgroundColor: "#e39972" }}
        tw="flex flex-col items-center justify-center w-full h-full"
      >
        <div style={{ fontSize: 24 }} tw="flex text-lg text-white">
          {name} | Altogic Pixel Art
        </div>
        <div tw="flex my-2">
          <img width={550} height={550} src={link} alt="" />
        </div>
      </section>
    ),
    {
      width: 1200,
      height: 627,
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
}

import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url || "");
  const link = searchParams.get("link");

  if (!link) {
    return new Response("Missing link", { status: 400 });
  }

  return new ImageResponse(
    (
      <section
        style={{ backgroundColor: "#4c1d95" }}
        tw="flex flex-col items-center justify-center w-full h-full"
      >
        <div tw="flex my-2">
          <img width={600} height={600} src={link} alt="" />
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

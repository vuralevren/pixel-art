import { ImageResponse } from "@vercel/og";
import Image from "next/image";

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

  // const data = await getUser(id);

  // if (data.errors) {
  // 	return new Response('User not found', { status: 404 });
  // }

  return new ImageResponse(
    (
      <section tw="flex flex-col items-center justify-center w-full h-full">
        <div tw="flex">{name} | Pixel Art</div>
        <div tw="flex my-2">
          <img width={500} height={500} src={link} alt="" />
        </div>
        <div tw="flex">Altogic</div>
      </section>
    ),
    {
      width: 1200,
      height: 627,
      headers: {
        "Cache-Control": "no-cache",
      },
      // debug: true,
    }
  );
}

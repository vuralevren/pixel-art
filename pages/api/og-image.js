import { ImageResponse } from "@vercel/og";
import Image from "next/image";
import ShowPixelTable from "../../components/show-pixel-table";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url || "");
  const link = searchParams.get("link");

  if (!link) {
    return new Response("Missing slug", { status: 400 });
  }

  // const data = await getUser(id);

  // if (data.errors) {
  // 	return new Response('User not found', { status: 404 });
  // }

  return new ImageResponse(
    (
      <section>
        <Image src={link} alt="" />
      </section>
    ),
    {
      width: 1200,
      height: 627,
      headers: {
        "Cache-Control": "no-cache",
      },
      debug: true,
    }
  );
}

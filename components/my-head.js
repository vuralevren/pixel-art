import Head from "next/head";

export default function MyHead({ pixelName, pixelSlug }) {
  return (
    <Head>
      <title>
        {pixelName ||
          "Real-Time Pixel Art Creator with Altogic - Suitable for All Skill Levels"}
      </title>
      <meta
        name="og:title"
        content={
          pixelName ||
          "Real-Time Pixel Art Creator with Altogic - Suitable for All Skill Levels"
        }
      />
      <meta name="og:type" content="website" />
      <meta
        name="og:description"
        content="Real-time pixel art app allows you to create digital masterpieces in real-time, with a user-friendly interface. Experience the power of Altogic today!"
      />
      <meta
        name="og:image"
        content={
          pixelSlug
            ? `https://pixel-art-next.vercel.app/api/og/${pixelSlug}?date=${new Date().getTime()}`
            : "/og-pixel.png"
        }
      />
      <meta
        name="description"
        content="Real-time pixel art app allows you to create digital masterpieces in real-time, with a user-friendly interface. Experience the power of Altogic today!"
      />
      <meta name="twitter:site" content="@Altogic" />
      <meta name="twitter:creator" content="@Altogic" />
      <meta
        property="twitter:title"
        content={
          pixelName ||
          "Real-Time Pixel Art Creator with Altogic - Suitable for All Skill Levels"
        }
      />
      <meta
        property="twitter:description"
        content="Real-time pixel art app allows you to create digital masterpieces in real-time, with a user-friendly interface. Experience the power of Altogic today!"
      />
      <meta
        property="twitter:url"
        content="https://pixel-art-next.vercel.app"
      />
    </Head>
  );
}

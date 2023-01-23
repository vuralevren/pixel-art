import { Html, Head, Main, NextScript } from "next/document";
import MyHead from "../components/my-head";

export default function Document() {
  return (
    <Html lang="en">
      <MyHead />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

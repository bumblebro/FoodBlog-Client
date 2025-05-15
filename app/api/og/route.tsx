// /////OLD
import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { url } from "inspector";
import DeSlugify from "@/libs/DeSlugify";
// import sharp from "sharp";

export const runtime = "experimental-edge";

async function loadGoogleFont() {
  const url = "https://fonts.googleapis.com/css2?family=Anton+SC&display=swap";

  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

async function loadFonts() {
  const regularFontData = await fetch(
    new URL("./SoinSansPro-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const boldFontData = await fetch(
    new URL("./source-sans-pro.black.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const lightFontData = await fetch(
    new URL("./source-sans-pro.extralight.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return { regularFontData, boldFontData, lightFontData };
}

async function loadGoogleFontWithParameter(font: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }
}

const phrases = [
  "The Most Amazing",
  "The Best",
  "Easy & Simple",
  "The Ultimate",
  "Simple & Easy",
  "Quick & Easy",
  "Super Delicious",
  "Really Good",
  "Tried & Tested",
  "Fast & Easy",
  "So Tasty",
  "The Greatest",
  "Top Rated",
  "Most Loved",
  "All-Time Favorite",
  "Easy & Tasty",
  "Highly Recommended",
  "Best Ever",
  "The Classic",
  "Go-To Recipe",
];

export async function GET(req: NextRequest) {
  const { regularFontData, boldFontData, lightFontData } = await loadFonts();

  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Default Title";
  const cover = searchParams.get("cover") || "";
  const num = searchParams.get("num") || "3";
  const isWhiteText = Math.random() < 0.5;

  const theme = {
    background: isWhiteText ? "black" : "white",
    text: isWhiteText ? "white" : "black",
  };
  const templates = [
    <div
      key={"1"}
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: theme.background,
      }}
    >
      {" "}
      <div
        style={{
          color: theme.text,
          textAlign: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
          fontSize: "120px",
          fontWeight: "900",
          fontFamily: "source-sans-pro.black",
          textTransform: "uppercase",
          lineHeight: "100px",
          paddingTop: "20px",
        }}
      >
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </div>{" "}
      <div
        style={{
          paddingBottom: "25px",
          color: theme.text,
          textAlign: "center",
          paddingRight: "10px",
          paddingLeft: "10px",
          paddingTop: "20px",
          fontSize: "75px",
          fontFamily: "SoinSansPro-Bold",
          textTransform: "capitalize",
        }}
      >
        {DeSlugify(title)}
      </div>{" "}
      <div
        style={{
          textAlign: "center",
          fontSize: "50px",
          color: theme.background,
          paddingRight: "30px",
          paddingLeft: "30px",
          fontStyle: "normal",
          backgroundColor: theme.text,
          fontWeight: 100,
          fontFamily: "source-sans-pro.extralight",
        }}
      >
        savorytouch.com
      </div>
      <div
        style={{
          borderBottom: `10px solid ${theme.text}`, // Add bottom border
          width: "100%",
        }}
      ></div>
      <img
        src={cover}
        alt="test"
        height={900}
        width={1000}
        style={{
          flexGrow: 1,
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>,
  ];

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];

  return new ImageResponse(randomTemplate, {
    width: 1000,
    height: 2000,

    fonts: [
      {
        name: "SoinSansPro-Bold",
        data: regularFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "source-sans-pro.black",
        data: boldFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "source-sans-pro.extralight",
        data: lightFontData,
        style: "normal",
        // weight: 900,
      },
      {
        name: "Geist",
        data: await loadGoogleFont(),
        weight: 500,
      },
      {
        name: "titlefont",
        data:
          (await loadGoogleFontWithParameter("Bebas+Neue", 400)) ||
          new ArrayBuffer(0),
        style: "normal",
      },
    ],
  });
}

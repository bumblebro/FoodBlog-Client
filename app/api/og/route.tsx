import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { url } from "inspector";
import DeSlugify from "@/libs/DeSlugify";

export const runtime = "experimental-edge";

async function loadGoogleFont() {
  // const url = "https://fonts.gogleapis.com/css2?family=Pacifico&display=swap";
  // const url = "https://fonts.googleapis.com/css2?family=Knewave&display=swap";
  // const url = "https://fonts.gogleapis.com/css2?family=Aclonica&display=swap";

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

  // const boldFontData = await fetch(
  //   new URL("@/assets/Lato-Bold.ttf", import.meta.url)
  // ).then((res) => res.arrayBuffer());

  return { regularFontData };
}

const phrases = [
  "The Most Amazing",
  "The Best",
  "Easy & Simple",
  "The Ultimate",
  "Simple & Easy",
];

export async function GET(req: NextRequest) {
  const { regularFontData } = await loadFonts();

  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Default Title";
  // const description = searchParams.get("description") || "Default Description";
  const cover = searchParams.get("cover") || "";
  const num = searchParams.get("num") || "3";

  const templates = [
    <div
      key={"1"}
      style={{
        height: "100vh", // Fixed height for the container
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "black",
        // backgroundImage: `url(${cover})`,
      }}
    >
      <div
        style={{
          // height: "200px", // Fixed height for title
          paddingTop: "10px",
          // paddingBottom: "25px",
          color: "white",
          textAlign: "center",
          paddingRight: "5px",
          paddingLeft: "5px",
          fontSize: "70px",
          fontWeight: "900",
          fontFamily: "Lato",
          textTransform: "uppercase",
        }}
      >
        {phrases[Math.floor(Math.random() * phrases.length)]}
      </div>{" "}
      <div
        style={{
          // height: "200px", // Fixed height for title
          // paddingTop: "25px",
          // paddingBottom: "25px",
          color: "white",
          textAlign: "center",
          paddingRight: "5px",
          paddingLeft: "5px",
          fontSize: "54px",
          fontFamily: "Lato",
        }}
      >
        {DeSlugify(title)}
      </div>{" "}
      <div
        style={{
          // height: "60px", // Fixed height for footer text
          textAlign: "center",
          fontSize: "40px",
          color: "black",
          paddingRight: "5px",
          paddingLeft: "5px",
          fontStyle: "normal",
          backgroundColor: "#FFFFF7",
        }}
      >
        savorytouch.com
      </div>
      <img
        src={cover}
        alt="test"
        height={1200}
        width={1000}
        style={{
          flexGrow: 1, // Ensures the image takes available space
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>,
    // <div
    //   style={{
    //     fontSize: 40,
    //     color: "black",
    //     background: "white",
    //     width: "100%",
    //     height: "100%",
    //     padding: "50px 200px",
    //     textAlign: "center",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   👋 Hello
    // </div>,
  ];

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];
  // const randomTemplate = templates[parseInt(0)];

  return new ImageResponse(randomTemplate, {
    width: 1000,
    height: 1500,

    fonts: [
      {
        name: "Lato",
        data: regularFontData,
        style: "normal",
        weight: 800,
      },
      {
        name: "Geist",
        data: await loadGoogleFont(),
        weight: 500,
      },
    ],
  });
}

import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

export const runtime = "experimental-edge";

async function loadGoogleFont() {
  // const url = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
  // const url = "https://fonts.googleapis.com/css2?family=Knewave&display=swap";
  const url = "https://fonts.googleapis.com/css2?family=Aclonica&display=swap";
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Default Title";
  // const description = searchParams.get("description") || "Default Description";
  const cover = searchParams.get("cover") || "";
  // const num = searchParams.get("num") || "0";

  const templates = [
    <div key={"1"} tw="w-full h-full flex items-center justify-center">
      {cover && (
        <img
          src={cover}
          alt=""
          tw="absolute w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
      )}
      <div tw="flex flex-col items-center bg-white  px-6 py-4 rounded-lg ">
        <div tw="text-white text-8xl font-bold text-black">{title}</div>
        <div tw="text-white text-2xl font-semibold mt-2 text-black">
          Savory Touch
        </div>
      </div>
    </div>,
  ];

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];
  // const randomTemplate = templates[parseInt(num)];

  return new ImageResponse(randomTemplate, {
    width: 1000,
    height: 1500,
    fonts: [
      {
        name: "Geist",
        data: await loadGoogleFont(),
        weight: 500,
      },
    ],
  });
}

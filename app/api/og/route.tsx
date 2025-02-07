import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { url } from "inspector";

// export const config = {
//   runtime: "experimental-edge",
// };
export const runtime = "edge";

const size = {
  width: 1000,
  height: 1500,
};

export async function GET(req: NextRequest) {
  const { searchParams, protocol, host } = new URL(req.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const cover = searchParams.get("cover");

  const coverUrl =
    cover &&
    `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      cover
    )}&w=1200&q=75`;

  return new ImageResponse(
    (
      <div tw="w-full h-full flex flex-col justify-end items-stretch justify-end bg-slate-200">
        {cover && (
          <img
            src={cover}
            alt=""
            tw="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
        <div tw="bg-white flex flex-col p-8">
          <div tw="text-5xl mb-2">{title}</div>
          <div tw="text-2xl">{description}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

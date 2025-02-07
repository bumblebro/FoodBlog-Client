import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

// export const config = {
//   runtime: "experimental-edge",
// };
export const runtime = "experimental-edge";

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
      <div
        className="relative w-full aspect-[2/3] bg-cover bg-center"
        style={{ backgroundImage: cover || "" }}
      >
        <div className="absolute top-1/3 left-4 text-white text-2xl font-bold drop-shadow-lg">
          {title}
        </div>
        <div className="absolute bottom-4 left-4 text-white text-base drop-shadow">
          {description}{" "}
        </div>
      </div>
    )
  );
}

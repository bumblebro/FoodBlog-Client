import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { url } from "inspector";

// export const config = {
//   runtime: "experimental-edge",
// };
export const runtime = "edge";
export const size = {
  width: 1000,
  height: 1500,
};

export async function GET(req: NextRequest) {
  const { searchParams, protocol, host } = new URL(req.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const cover = searchParams.get("cover");

  const font1 = fetch(new URL("https://www.bargpt.app/Dosis-Medium.ttf")).then(
    (res) => res.arrayBuffer()
  );

  const [font1Data] = await Promise.all([font1]);

  const coverUrl =
    cover &&
    `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      cover
    )}&w=1200&q=75`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#fff",
          fontSize: 90,
          fontWeight: 600,
          fontFamily: "MyFont",
          backgroundImage:
            "radial-gradient(circle, rgba(8,8,8,1) 50%, rgba(67,69,73,1) 100%)",
        }}
      >
        <div
          style={{
            paddingTop: "25px",
            paddingBottom: "25px",
            color: "white",
            textAlign: "center",
            paddingRight: "5px",
            paddingLeft: "5px",
          }}
        >
          {title}
        </div>
        <img
          src={cover || ""}
          alt="test"
          height={1000}
          width={1000}
          style={{
            width: "100%",
            objectFit: `contain`,
            objectPosition: "center",
          }}
        />
        <div
          style={{
            paddingTop: "35px",
            textAlign: "center",
            fontSize: "54px",
            color: "white",
            paddingRight: "5px",
            paddingLeft: "5px",
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "MyFont",
          data: font1Data,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}

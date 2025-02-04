import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

// export const config = {
//   runtime: "experimental-edge",
// };

export async function GET(req: NextRequest) {
  const { searchParams, protocol, host } = new URL(req.url);
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const cover =
    searchParams.get("cover") ||
    "http://localhost:3003/_next/image?url=https%3A%2F%2Fcdn.prod.website-files.com%2F65ef2fec8eeef9e7a31b03f9%2F6626d204aea7d43caf33079f_660f6869495c0226b21fe93e_Peach-Tart-5-1200x1798.webp&w=1200&q=75";

  const coverUrl =
    cover &&
    `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      cover
    )}&w=1200&q=75`;

  return new ImageResponse(
    (
      //   (
      //     <div tw="w-full h-full flex flex-col justify-end items-stretch justify-end bg-slate-200">
      //       {coverUrl && (
      //         <img
      //           src={coverUrl}
      //           alt=""
      //           tw="w-full h-full"
      //           style={{ objectFit: "cover", objectPosition: "center" }}
      //         />
      //       )}
      //       <div tw="bg-white flex flex-col p-8">
      //         <div tw="text-5xl mb-2">{title}</div>
      //         <div tw="text-2xl">{description}</div>
      //       </div>
      //     </div>
      //   ),
      //   { width: 1200, height: 628 }
      // );

      <div tw="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-purple-600 via-pink-500 to-yellow-400">
        {coverUrl && (
          <img
            src={coverUrl}
            alt=""
            tw="absolute inset-0 w-full h-full opacity-60"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "blur(2px) saturate(120%)",
            }}
          />
        )}
        <div tw="relative z-10 flex flex-col items-center text-center px-10">
          <div tw="text-7xl font-extrabold text-white uppercase tracking-wider mb-4 mix-blend-exclusion">
            {title}
          </div>
          <div tw="text-3xl font-bold text-black bg-white px-6 py-2 rounded-full shadow-lg">
            {description}
          </div>
        </div>
      </div>
    ),
    { width: 1000, height: 1500 }
  );
}

// import { ImageResponse } from 'next/og';
// // App router includes @vercel/og.
// // No need to install it.

// export async function GET() {
//   return new ImageResponse(
//     (
//       <div
//         style={{
//           fontSize: 40,
//           color: 'black',
//           background: 'white',
//           width: '100%',
//           height: '100%',
//           padding: '50px 200px',
//           textAlign: 'center',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         👋 Hello
//       </div>
//     ),
//     {
//       width: 1200,
//       height: 630,
//     },
//   );
// }

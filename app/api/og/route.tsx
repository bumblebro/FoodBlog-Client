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
      <div tw="w-full h-full flex flex-col justify-end items-stretch justify-end bg-slate-200">
        {coverUrl && (
          <img
            src={coverUrl}
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
    //   <div tw="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-purple-600 via-pink-500 to-yellow-400">
    //     {coverUrl && (
    //       <img
    //         src={coverUrl}
    //         alt=""
    //         tw="absolute inset-0 w-full h-full opacity-60"
    //         style={{
    //           objectFit: "cover",
    //           objectPosition: "center",
    //           filter: "blur(2px) saturate(120%)",
    //         }}
    //       />
    //     )}
    //     <div tw="relative z-10 flex flex-col items-center text-center px-10">
    //       <div tw="text-7xl font-extrabold text-white uppercase tracking-wider mb-4 mix-blend-exclusion">
    //         {title}
    //       </div>
    //       <div tw="text-3xl font-bold text-black bg-white px-6 py-2 rounded-full shadow-lg">
    //         {description}
    //       </div>
    //     </div>
    //   </div>

    //   <div tw="w-full h-full relative flex items-center justify-center bg-black">
    //     {coverUrl && (
    //       <img
    //         src={coverUrl}
    //         alt=""
    //         tw="absolute inset-0 w-full h-full opacity-80"
    //         style={{
    //           objectFit: "cover",
    //           objectPosition: "center",
    //           filter: "grayscale(30%) contrast(120%) blur(1px)",
    //         }}
    //       />
    //     )}
    //     <div tw="absolute top-5 left-5 bg-yellow-400 text-black px-6 py-2 text-2xl font-extrabold uppercase rounded-lg shadow-lg rotate-[-5deg]">
    //       HOT PICK 🔥
    //     </div>
    //     <div tw="relative z-10 flex flex-col items-center text-center px-10">
    //       <div tw="text-6xl font-bold text-white bg-black bg-opacity-70 px-4 py-2 rounded-md shadow-lg tracking-wide">
    //         {title}
    //       </div>
    //       <div tw="text-3xl font-semibold text-black bg-white px-6 py-3 mt-4 rounded-lg shadow-xl rotate-[5deg]">
    //         {description}
    //       </div>
    //     </div>
    //   </div>
    // ),
    // { width: 1000, height: 1500 }

    //   <div tw="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-purple-600 to-pink-500">
    //     {coverUrl && (
    //       <img
    //         src={coverUrl}
    //         alt=""
    //         tw="absolute inset-0 w-full h-full opacity-70"
    //         style={{
    //           objectFit: "cover",
    //           objectPosition: "center",
    //           filter: "brightness(80%) blur(2px)",
    //         }}
    //       />
    //     )}
    //     <div tw="absolute top-10 left-5 bg-white text-purple-700 px-6 py-3 text-2xl font-extrabold uppercase rounded-full shadow-lg">
    //       Trending Now 💥
    //     </div>
    //     <div tw="relative z-10 flex flex-col items-center text-center px-10">
    //       <div tw="text-7xl font-extrabold text-white drop-shadow-md tracking-wider uppercase bg-black bg-opacity-50 px-5 py-3 rounded-lg">
    //         {title}
    //       </div>
    //       <div tw="text-3xl font-semibold text-white bg-purple-800 bg-opacity-80 px-8 py-4 mt-5 rounded-xl shadow-xl">
    //         {description}
    //       </div>
    //     </div>
    //     <div tw="absolute bottom-5 right-5 bg-white text-pink-500 px-5 py-2 text-xl font-bold uppercase rounded-full shadow-md rotate-[-10deg]">
    //       🚀 Must See!
    //     </div>
    //   </div>

    // <div tw="w-full h-full relative flex items-center justify-center">
    //   {coverUrl && (
    //     <img
    //       src={coverUrl}
    //       alt=""
    //       tw="absolute inset-0 w-full h-full"
    //       style={{
    //         objectFit: "cover",
    //         objectPosition: "center",
    //         filter: "contrast(1.2) saturate(1.2) brightness(90%)",
    //       }}
    //     />
    //   )}
    //   {/* Overlay */}
    //   <div tw="absolute inset-0 bg-black bg-opacity-50 mix-blend-multiply"></div>

    //   {/* Funky Text Layout */}
    //   <div tw="relative z-10 flex flex-col items-center text-center p-12">
    //     <div tw="text-7xl font-extrabold text-yellow-400 drop-shadow-lg uppercase tracking-wide transform -rotate-6">
    //       {title}
    //     </div>
    //     <div tw="text-3xl font-bold text-white bg-pink-600 bg-opacity-80 px-6 py-3 mt-4 rounded-lg shadow-lg transform rotate-3">
    //       {description}
    //     </div>
    //   </div>

    //   {/* Sticker Element */}
    //   <div tw="absolute top-5 right-5 bg-white text-black px-5 py-2 text-lg font-bold uppercase rounded-full shadow-lg rotate-[15deg]">
    //     🔥 Hot Pick!
    //   </div>

    //   {/* Abstract Shapes */}
    //   <div tw="absolute left-10 top-10 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
    //   <div tw="absolute right-10 bottom-10 w-24 h-24 bg-blue-500 rounded-full opacity-70"></div>
    //   <div tw="absolute bottom-20 left-20 w-10 h-10 bg-white rounded-full opacity-60"></div>
    // </div>

    // <div tw="w-full h-full relative flex items-center justify-center">
    //   {coverUrl && (
    //     <img
    //       src={coverUrl}
    //       alt=""
    //       tw="absolute inset-0 w-full h-full"
    //       style={{
    //         objectFit: "cover",
    //         objectPosition: "center",
    //         filter: "contrast(1.2) saturate(1.4) brightness(80%)",
    //       }}
    //     />
    //   )}

    //   {/* Overlay with Neon Glow Effect */}
    //   <div tw="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

    //   {/* Bold Text Layout */}
    //   <div tw="relative z-10 flex flex-col items-center text-center p-10">
    //     <div tw="text-6xl font-extrabold text-white bg-pink-500 px-6 py-3 rounded-lg shadow-lg transform -rotate-2 tracking-widest">
    //       {title}
    //     </div>
    //     <div tw="text-3xl font-bold text-black bg-yellow-300 px-6 py-2 mt-4 rounded-md shadow-md transform rotate-3">
    //       {description}
    //     </div>
    //   </div>

    //   {/* Sticker Badge */}
    //   <div tw="absolute top-6 right-6 bg-white text-black px-4 py-2 text-xl font-bold uppercase rounded-full shadow-xl rotate-[10deg] border border-black">
    //     ⚡ Must-See!
    //   </div>

    //   {/* Funky Abstract Elements */}
    //   <div tw="absolute left-8 bottom-12 w-14 h-14 bg-blue-400 rounded-full opacity-75 shadow-xl"></div>
    //   <div tw="absolute right-16 top-16 w-20 h-20 bg-red-500 rounded-full opacity-80 shadow-lg"></div>
    //   <div tw="absolute bottom-24 right-24 w-10 h-10 bg-white rounded-full opacity-60"></div>
    // </div>
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

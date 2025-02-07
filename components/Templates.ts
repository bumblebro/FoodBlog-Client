// import { NextRequest, NextResponse } from "next/server";
// import { ImageResponse } from "@vercel/og";

// // export const config = {
// //   runtime: "experimental-edge",
// // };
// export const runtime = "edge";

// export async function GET(req: NextRequest) {
//   const { searchParams, protocol, host } = new URL(req.url);
//   const title = searchParams.get("title");
//   const description = searchParams.get("description");
//   const cover = searchParams.get("cover");

//   const coverUrl =
//     cover &&
//     `${protocol}//${host}/_next/image?url=${encodeURIComponent(
//       cover
//     )}&w=1200&q=75`;

//   return new ImageResponse(
//     (
//       <div tw="w-full h-full flex flex-col justify-end items-stretch justify-end bg-slate-200">
//         {cover && (
//           <img
//             src={cover}
//             alt=""
//             tw="w-full h-full"
//             style={{ objectFit: "cover", objectPosition: "center" }}
//           />
//         )}
//         <div tw="bg-white flex flex-col p-8">
//           <div tw="text-5xl mb-2">{title}</div>
//           <div tw="text-2xl">{description}</div>
//         </div>
//       </div>

//       // <div tw="relative w-full h-full bg-slate-200">
//       //   {cover && (
//       //     <img
//       //       src={cover}
//       //       alt="Cover image"
//       //       tw="absolute inset-0 w-full h-full object-cover object-center"
//       //     />
//       //   )}
//       //   {/* Gradient overlay for improved text contrast */}
//       //   <div tw="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//       //   <div tw="absolute bottom-0 left-0 w-full p-8">
//       //     <h1 tw="text-5xl font-bold text-white mb-2">{title}</h1>
//       //     <p tw="text-2xl text-white">{description}</p>
//       //   </div>
//       // </div>
//     ),
//     { width: 1000, height: 1500 }
//   );
// }

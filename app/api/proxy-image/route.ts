export const runtime = "nodejs";
import sharp from "sharp";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const u = url.searchParams.get("url");
  console.log(`Proxying image from: ${u}`);
  if (!u) return new Response("Missing url", { status: 400 });

  const r = await fetch(u, { redirect: "follow" });
  if (!r.ok) return new Response(`Fetch failed: ${r.status}`, { status: 502 });

  const buf = Buffer.from(await r.arrayBuffer());
  try {
    const out = await sharp(buf).png().toBuffer(); // or .jpeg()
    return new Response(out, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: any) {
    return new Response(`Transcode failed: ${e.message}`, { status: 415 });
  }
}

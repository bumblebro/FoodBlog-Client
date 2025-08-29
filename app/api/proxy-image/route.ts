// export const runtime = "nodejs";
// import sharp from "sharp";

// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const u = url.searchParams.get("url");
//   console.log(`Proxying image from: ${u}`);
//   if (!u) return new Response("Missing url", { status: 400 });

//   // const r = await fetch(u, { redirect: "follow" });
//   const r = await fetch(u, {
//     redirect: "follow",
//     headers: {
//       Accept: "image/avif,image/webp,image/apng,image/*;q=0.8,*/*;q=0.5",
//       "Accept-Language": "en-US,en;q=0.9",
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
//         "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
//       Referer: "https://savorytouch.com/",
//       Connection: "keep-alive",
//     },
//   });

//   if (!r.ok) return new Response(`Fetch failed: ${r.status}`, { status: 502 });

//   const buf = Buffer.from(await r.arrayBuffer());
//   try {
//     const out = await sharp(buf).png().toBuffer(); // or .jpeg()
//     return new Response(out, {
//       status: 200,
//       headers: {
//         "Content-Type": "image/png",
//         "Cache-Control": "public, max-age=31536000, immutable",
//       },
//     });
//   } catch (e: any) {
//     return new Response(`Transcode failed: ${e.message}`, { status: 415 });
//   }
// }

// app/api/proxy-image/route.ts
export const runtime = "nodejs";
import sharp from "sharp";
import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first"); // ← important on some hosts

const FETCH_TIMEOUT_MS = 10000;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

async function fetchWithRetry(u: string, init: RequestInit, tries = 2) {
  let last: any;
  for (let i = 0; i <= tries; i++) {
    try {
      const r = await fetch(u, init);
      if (r.ok) return r;
      last = new Error(`status ${r.status} ${r.statusText}`);
    } catch (e) {
      last = e;
    }
    await new Promise((r) => setTimeout(r, 250 * (i + 1)));
  }
  throw last;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const src = url.searchParams.get("url");
  if (!src) return new Response("Missing url", { status: 400 });
  if (!/^https?:\/\//i.test(src))
    return new Response("Only http(s) URLs allowed", { status: 400 });

  // Timeout
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS);

  const init: RequestInit = {
    redirect: "follow",
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/*;q=0.8,*/*;q=0.5",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": UA,
      Referer: "https://savorytouch.com/",
      Connection: "keep-alive",
    },
    signal: ac.signal,
  };

  let res: Response;
  try {
    res = await fetchWithRetry(src, init, 2);
  } catch (e: any) {
    clearTimeout(timer);
    return new Response(`Upstream fetch failed: ${e.message || String(e)}`, {
      status: 502,
    });
  }
  clearTimeout(timer);

  if (!res.ok) {
    const ct = res.headers.get("content-type") || "";
    let preview = "";
    try {
      preview = (await res.clone().text()).slice(0, 200);
    } catch {}
    console.error(
      "[proxy-image] Non-OK:",
      res.status,
      res.statusText,
      ct,
      preview
    );
    return new Response(`Fetch failed: ${res.status} ${res.statusText}`, {
      status: 502,
    });
  }

  // Passthrough if already jpg/png (cheaper)
  const ctype = (res.headers.get("content-type") || "").toLowerCase();
  const buf = Buffer.from(await res.arrayBuffer());
  if (ctype.startsWith("image/jpeg") || ctype.startsWith("image/png")) {
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": ctype,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  // Otherwise transcode (webp/avif/gif → png)
  try {
    const out = await sharp(buf, { animated: false })
      .resize({ width: 1200, withoutEnlargement: true }) // optional CPU saver
      .png({ compressionLevel: 8 })
      .toBuffer();

    return new Response(out, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (e: any) {
    console.error("[proxy-image] sharp failed:", e?.message || e);
    return new Response(`Transcode failed: ${e.message || e}`, { status: 415 });
  }
}

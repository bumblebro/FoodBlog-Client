import BLOGCOMPLETE from "@/app/api/blogscomplete/BLOGCOMPLETE";
import { FoodBlogs } from "@prisma/client";
import { Feed } from "feed";

export const revalidate = 1; // revalidate at most every hour

const domain =
  process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/^https:/, "http:") || "";

export async function GET(request: Request, response: Response) {
  const recipes = await BLOGCOMPLETE();
  console.log(`rec`, recipes);

  const rss = generateRSSFeed(recipes);

  return new Response(rss, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function generateRSSFeed(recipes: any) {
  const siteURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
  const date = new Date();
  const author = {
    name: "SavoryTouch",
    link: "https://savorytouch.com",
  };

  const feed = new Feed({
    title: "SavoryTouch",
    description:
      "Welcome to SavoryTouch, your go-to destination for all things food and drink. Here, we celebrate the joys of culinary exploration where every dish tells a story and every flavor brings an experience to life. Whether you&apos;re a passionate home cook, a curious foodie, or someone who just loves to savor the art of dining, you&apos;ve found the perfect place.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/opengraph-image.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date, // today's date
    generator: "Feed",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });

  recipes.map((r: any, i: any) => {
    const imageUrl =
      process.env.NEXT_PUBLIC_BASE_API_URL +
      `/api/og?` +
      `title=${r.title}` +
      `&cover=${r.imageurl}`;
    console.log(`urllll`, imageUrl);

    const url = siteURL + "/" + r.slug;
    if (imageUrl) {
      feed.addItem({
        title: r.name,
        id: url,
        link: url,
        description: r.recipedescription,
        // content: r.recipedescription,
        author: [author],
        contributor: [author],
        date: r.creationDate,
        image: {
          type: "image/png",
          url: domain + `/api/og?title=${r.title}&amp;cover=${r.imageurl}`,
        },
      });
    }
  });

  return feed.rss2();
}

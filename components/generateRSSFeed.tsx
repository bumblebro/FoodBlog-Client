import BLOGCOMPLETE from "@/app/api/blogscomplete/BLOGCOMPLETE";
import { Feed } from "feed";

export const revalidate = 1; // revalidate at most every hour

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
    name: "BarBPT",
    link: "https://twitter.com/BarGPT",
  };

  const feed = new Feed({
    title: "BarGPT AI Generated Cocktail Recipes",
    description:
      "Create your own AI generated cocktail recipes or browse through thousands of new innovative cocktails.",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/bargpt.jpg`,
    favicon: `${siteURL}/bargpt.jpg`,
    copyright: `All rights reserved ${date.getFullYear()},`,
    updated: date, // today's date
    generator: "Feed",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });

  recipes.map((r: any, i: any) => {
    const url = siteURL + "/ai-cocktail-recipe/" + r.cocktailid;
    //console.log(r.imageurl);
    if (r.imageurl && r.imageurl.indexOf("s3") > 0) {
      feed.addItem({
        title: r.name,
        id: url,
        link: url,
        description:
          r.name +
          " an AI created cocktail. " +
          (r.shortsummary ? r.shortsummary : ""),
        content: r.description,
        author: [author],
        contributor: [author],
        date: new Date(r.dateString as string),
        image: {
          type: "image/png",
          url:
            "https://www.bargpt.app/api/ogpinterest1?name=" +
            encodeURIComponent(r.name) +
            "&amp;image=" +
            encodeURIComponent(r.imageurl) +
            "&amp;desc=" +
            encodeURIComponent(r.shortsummary),
        },
      });
    }
  });

  return feed.rss2();
}

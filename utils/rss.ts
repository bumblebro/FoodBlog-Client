import fs from "fs";
import RSS from "rss";

export default async function generateRssFeed(allPosts: any) {
  try {
    const site_url = process.env.NEXT_PUBLIC_BASE_API_URL;

    const feedOptions = {
      title: "Blog posts | RSS Feed",
      description: "Welcome to this blog posts!",
      site_url: site_url,
      feed_url: `${site_url}/rss.xml`,
      image_url: `${site_url}/logo.jpeg`,
      pubDate: new Date(),
      copyright: `All rights reserved ${new Date().getFullYear()}`,
    };

    const feed = new RSS(feedOptions);

    // Add each individual post to the feed.
    allPosts.map((post: any) => {
      feed.item({
        title: post.title,
        description: post.recipedescription,
        url: `${site_url}${post.slug}`,
        date: post.creationDate,
      });
    });

    // Write the RSS feed to a file as XML.
    fs.writeFileSync("rss.xml", feed.xml({ indent: true }));
  } catch (e) {
    console.log(`error`, e);
  }
}

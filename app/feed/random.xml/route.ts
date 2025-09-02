import { PrismaClient } from "@prisma/client";
import DeSlugify from "@/libs/DeSlugify";
import { Feed } from "feed";

const boardId = {
  Italian: "1004936173041503523", // Italian Recipes
  Mexican: "1004936173041503539", // Mexican Recipes
  Asian: "1004936173041503542", // Asian Recipes
  Mediterranean: "1004936173041503543", // Mediterranean Recipes
  American: "1004936173041503548", // American Recipes
  Indian: "1004936173041747897", // Indian Recipes
  French: "1004936173041503550", // French Recipes
  Japanese: "1004936173041503552", // Japanese Recipes
  Greek: "1004936173041503554", // Greek Recipes
  Spanish: "1004936173041503556", // Spanish Recipes
  Breakfast: "1004936173041503557", // Breakfast Recipes
  Lunch: "1004936173041503560", // Lunch Recipes
  Dinner: "1004936173041503561", // Dinner Recipes
  Snacks: "1004936173041503563", // Snacks Recipes
  Desserts: "1004936173041503564", // Desserts Recipes
  Brunch: "1004936173041503565", // Brunch Recipes
  Vegetarian: "1004936173041503566", // Vegetarian Recipes
  Vegan: "1004936173041503569", // Vegan Recipes
  "Gluten-Free": "1004936173041503572", // Gluten Free Recipes
  Keto: "1004936173041503573", // Keto Friendly Recipes
  Paleo: "1004936173041503574", // Paleo Recipes
  "Low-Carb": "1004936173041503575", // Low Carb Recipes
  "Dairy-Free": "1004936173041503576", // Dairy-Free Recipes
  Fruits: "1004936173041503577", // Fruits Recipes
  Vegetables: "1004936173041503578", // Vegetables Recipes
  Proteins: "1004936173041747898", // Proteins Recipes
  Grains: "1004936173041503579", // Grains Recipes
  "Spices-and-Herbs": "1004936173041503581", // Spices and Herbs Recipes
  Baking: "1004936173041503582", // Baking Recipes
  Grilling: "1004936173041494942", // Grilling Recipes
  Roasting: "1004936173041503586", // Roasting Recipes
  Sautéing: "1004936173041503589", // Sautéing Recipes
  Boiling: "1004936173041503590", // Boiling Recipes
  Steaming: "1004936173041503592", // Steaming Recipes
  Frying: "1004936173041503593", // Frying Recipes
  Smoking: "1004936173041503594", // Smoking Recipes

  "Quick-Meals": "1004936173041503595", // Quick Meals Recipes
  "Slow-Cooker": "1004936173041503596", // Slow Cooker Recipes
  "Instant-Pot": "1004936173041503597", // Instant Pot Recipes
  "Batch-Cooking": "1004936173041503601", // Batch Cooking Recipes
  "No-Cook": "1004936173041503602", // No Cook Recipes
  "One-Bowl-Meals": "1004936173041503603", // One Bowl Meals Recipes
  "Kid-Friendly": "1004936173041503604", // Kid Friendly Recipes
  "Plant-Based": "1004936173041503605", // Plant Based Recipes
  "Fusion-Cuisine": "1004936173041503606", // Fusion Cuisine Recipes
  "Healthy-Swaps": "1004936173041503608", // Healthy Swaps Recipes
  "Fermented-Foods": "1004936173041503610", // Fermented Food Recipes
  "Zero-Waste-Cooking": "1004936173041503611", // Zero Waste Cooking Recipes
  Spring: "1004936173041503612", // Spring Recipes
  Summer: "1004936173041503613", // Summer Recipes
  Fall: "1004936173041503614", // Fall Recipes
  Winter: "1004936173041503615", // Winter Recipes
  Holiday: "1004936173041503616", // Holiday Recipes
  "Middle-Eastern": "1004936173041503617", // Middle Eastern Recipes
  "South-American": "1004936173041503618", // South American Recipes
  African: "1004936173041503620", // African Recipes
  Caribbean: "1004936173041503622", // Caribbean Recipes
  Nordic: "1004936173041503623", // Nordic Recipes
  Birthday: "1004936173041503624", // Birthday Recipes
  Anniversary: "1004936173041503625", // Anniversary Recipes
  Picnic: "1004936173041503626", // Picnic Recipes
  Potluck: "1004936173041503627", // Potluck Recipes
  "Game-Day": "1004936173041503628", // Game Day Recipes
};

export const dynamic = "force-dynamic";
const domain =
  process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/^https:/, "http:") || "";

const count = parseInt(process.env.RANDOMBLOGCOUNT || "6", 10);

export async function GET(request: Request, response: Response) {
  // Fetch random blogs directly using Prisma
  const prisma = new PrismaClient();
  const totalBlogs = await prisma.foodBlogs.count();
  let blogs = [];
  if (totalBlogs <= count) {
    blogs = await prisma.foodBlogs.findMany({
      take: count,
      orderBy: { creationDate: "desc" },
    });
  } else {
    // Get unique random skips
    const skips = new Set<number>();
    while (skips.size < count) {
      skips.add(Math.floor(Math.random() * totalBlogs));
    }
    const blogPromises = Array.from(skips).map((skip) =>
      prisma.foodBlogs.findFirst({
        skip,
        select: {
          author: true,
          section: true,
          subsection: true,
          subsubsection: true,
          title: true,
          slug: true,
          imageurl: true,
          content: true,
          instructions: true,
          recipedescription: true,
          recipedetails: true,
          creationDate: true,
          seo: true,
        },
      })
    );
    blogs = (await Promise.all(blogPromises)).filter(Boolean);
  }
  await prisma.$disconnect();
  const rss = generateRSSFeed(blogs);
  return new Response(rss, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });

  function generateRSSFeed(blogs: any) {
    const siteURL = process.env.NEXT_PUBLIC_BASE_API_URL || "";
    const date = new Date();
    const author = {
      name: "SavoryTouch",
      link: "https://savorytouch.com",
    };

    const feed = new Feed({
      title: "SavoryTouch - Random Blogs",
      description:
        "A random selection of 6 blogs from SavoryTouch. Discover something new each time!",
      id: siteURL,
      link: siteURL,
      image: `${siteURL}/opengraph-image.png`,
      favicon: `${siteURL}/favicon.ico`,
      copyright: `All rights reserved ${date.getFullYear()}`,
      updated: date,
      generator: "Feed",
      feedLinks: {
        rss2: `${siteURL}/feed/random.xml`,
        json: `${siteURL}/feed/random.json`,
      },
      author,
      language: "en-us",
    });

    blogs.forEach((r: any) => {
      const id = boardId[r.subsection as keyof typeof boardId];

      const hasImageExtension = /\.(jpe?g|png|gif|webp|bmp)$/i.test(r.imageurl);
      if (hasImageExtension) {
        const imageUrl =
          process.env.NEXT_PUBLIC_BASE_API_URL +
          `/api/og?` +
          `title=${r.title}` +
          `&cover=${r.imageurl}`;
        const url = siteURL + "/" + r.slug;
        feed.addItem({
          title: DeSlugify(r.title),
          id: url,
          link: url,
          description: r.recipedescription,
          author: [author],
          contributor: [author],
          date: new Date(Date.now() - 60 * 60 * 1000), // pubDate is set to 1 hour before now
          category: [
            { name: id },
            { name: r.subsection },
            { name: r.subsubsection },
          ],
          image: {
            type: "image/png",
            url:
              domain +
              `/api/og?title=${r.title}&amp;cover=${encodeURIComponent(
                r.imageurl
              )}`,
          },
        });
      }
    });
    return feed.rss2();
  }
}

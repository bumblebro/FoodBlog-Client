import BlogList from "@/components/bloglist/BlogList";
import Paginationblog from "@/components/pagination/Paginationblog";
import { FoodBlogs } from "@prisma/client";
import GETBLOG from "./api/blogs/GETBLOG";
import FeaturedPost from "@/components/featuredPost/FeaturedPost";
import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import localFont from "next/font/local";
import FoodSections from "@/components/FoodSections";
import Navbar2 from "@/components/navbar2/page";
import Navbar3 from "@/components/navbar3/page";

import { Poppins } from "next/font/google";
import AdCode from "@/components/AdCode";
import { DisplayAdUnit } from "@/components/Ads/ad-unit";
// Poppins
const Poppins700 = Poppins({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const Poppins400 = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const freight = localFont({
  src: "../app/fonts/freight-neo-pro-book.otf",
});

const freightlight = localFont({
  src: "../app/fonts/fonnts.com-FreightNeo_Pro_Light.otf",
});

const freightbig = localFont({
  src: "../app/fonts/Freight Big Pro Medium Italic.otf",
});

const freightbigstraight = localFont({
  src: "../app/fonts/Freight Big Pro Medium.otf",
});
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Savory Touch | The Latest in Food & Drink Delights",
  };
}
// const slugs = [
//   "Cuisine Types",
//   "Meal Types",
//   "Dietary Preferences",
//   "Cooking Techniques",
//   "Ingredients",
//   "Drinks",
//   "Special Occasions",
//   "Recipe Formats",
//   "Cooking Tips",
//   "Food Culture",
// ];

const slugs = [
  "Cuisine-Types",
  "Meal-Types",
  "Dietary-Preferences",
  "Cooking-Techniques",
  "Ingredients",
  "Recipe-Formats",
  "Modern-Trends",
  "Seasonal-Recipes",
  "Global-Flavors",
  "Special-Occasions",
];

async function Home({ searchParams }: { searchParams: { pageNo: string } }) {
  let posts: FoodBlogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;

  const response = await GETBLOG({ pageNo: "1" });
  if (response) {
    posts = response.blogs;
    pageNo = "1";
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
  }

  return (
    <>
      {/* <Navbar2 decodedslug={slugs} home={true} /> */}
      <Navbar3 decodedslug={slugs} home={true} />
      <FeaturedPost posts={posts || []} />
      {/* <FoodSections /> */}
      <div className="mt-32 md:mt-10 lg:mt-8 ">
        {/* <AdCode>
          {" "}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5012580427673167"
            data-ad-slot={8446957885}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </AdCode>{" "} */}
        <h1>Advertisement1</h1>
        <DisplayAdUnit format="auto" />
        <h1>Advertisement2</h1>
        <AdCode>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5012580427673167"
            data-ad-slot="8446957885"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </AdCode>
        <h1
          className={`text-center  text-lg font-semibold tracking-wider ${Poppins700.className}`}
        >
          The Latest Recipes
        </h1>
        <BlogList posts={posts || []} />
        <Paginationblog
          pageNo={pageNo}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
        />
      </div>
    </>
  );
}

export default Home;

import BlogList from "@/components/bloglist/BlogList";
import Paginationblog from "@/components/pagination/Paginationblog";
import { Blogs } from "@prisma/client";
import GETBLOG from "./api/blogs/GETBLOG";
import FeaturedPost from "@/components/featuredPost/FeaturedPost";
import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Word of Many | The latest in Products, Culture & Style",
  };
}
const slugs = [
  "Tech",
  "Fashion",
  "Rides",
  "Lifestyle",
  "Entertainment",
  "Living",
  "Outdoors",
  "News",
];
async function Home({ searchParams }: { searchParams: { pageNo: string } }) {
  let posts: Blogs[] = [];
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
      <Navbar decodedslug={slugs} home={true} />
      <FeaturedPost posts={posts || []} />
      <div className="mt-32 md:mt-10 lg:mt-8 ">
        <h1 className="text-center  text-lg font-semibold tracking-wider">
          The Latest News
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

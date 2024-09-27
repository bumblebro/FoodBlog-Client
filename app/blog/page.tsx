import { Blogs } from "@prisma/client";
import BlogList from "@/components/bloglist/BlogList";
import Paginationblog from "@/components/pagination/Paginationblog";
import GETBLOG from "../api/blogs/GETBLOG";
import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";

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

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
    title: "Blog",
    description:
      "Enjoy access to the complete Word of Many's archived articles—every post and every page we have ever published.",
    alternates: {
      canonical: "/blog",
    },
  };
}

async function Blog({ searchParams }: { searchParams: { pageNo: string } }) {
  let sidebar = false;
  let posts: Blogs[] = [];
  let pageNo = "1";
  let totalPages = 1;
  let hasNextPage = false;
  let totalBlogs = 0;

  // if (searchParams.pageNo) {
  //   // const res = await fetch(
  //   //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${searchParams.pageNo}`,
  //   //   {
  //   //     method: "GET",
  //   //     headers: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   }
  //   // );
  //   const response = await GETBLOG({ pageNo: searchParams.pageNo });

  //   // const response = await res.json();
  //   if (response) {
  //     posts = response.blogs;
  //     pageNo = searchParams.pageNo;
  //     totalPages = response.metaData.totalPages;
  //     hasNextPage = response.metaData.hasNextPage;
  //     totalBlogs = response.metaData.totalBlogs;
  //   }
  // } else {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/blogs?pageNo=${"1"}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // const response = await res.json();
  const response = await GETBLOG({ pageNo: "1" });

  if (response) {
    posts = response.blogs;
    pageNo = "1";
    totalPages = response.metaData.totalPages;
    hasNextPage = response.metaData.hasNextPage;
    totalBlogs = response.metaData.totalBlogs;
  }

  return (
    <>
      {" "}
      <Navbar  decodedslug={slugs} home={true} />
      <div className="mt-28 px-4">
        <h1 className="text-center  text-2xl font-semibold tracking-wider pb-4">
          The Latest News - Page 1
        </h1>
        <h1 className="text-center  text-sm font-semibold tracking-wider">
          {totalBlogs} Latest Posts Articles Published
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

export default Blog;

import { Blogs } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import CopyBtn from "../ClientComponents/CopyBtn";
import ShareBtn from "../ClientComponents/ShareBtn";
import DeSlugify from "@/libs/DeSlugify";
import MarkdownComponent from "../Markdown";
import Image from "next/image";
import { shimmer, toBase64 } from "@/libs/Shimmer";

interface JsonValue {
  [key: string]: any;
}
type SEOType = {
  ogDescription: string;
  ogTitle: string;
  ogImage: string;
};

type ContentItem = {
  title: string;
  url: string;
  alt: string;
  description: string;
};

interface BlogDisp {
  decodedslug: string[];
  // currentPost: {
  //   id: string;
  //   author: string;
  //   title: string;
  //   imageurl: string;
  //   imagealt: string;
  //   quote: string;
  //   section: string;
  //   subsection: string;
  //   subsubsection: string;
  //   content: JsonValue[];
  //   seo: JsonValue;
  //   creationDate: Date;
  // };
  currentPost: Blogs;
  posts: Blogs[];
  latposts: Blogs[];
}
function BlogDisplay({ decodedslug, currentPost, posts, latposts }: BlogDisp) {
  const date = new Date(currentPost.creationDate);

  return (
    <div className=" xl:max-w-[73rem] mx-auto  mb-10 md:grid md:grid-cols-[56.7%_auto] lg:grid-cols-[67.5%_auto] xl:grid-cols-[74.25%_auto] xl:gap-2 2xl:grid-cols-[71.5%_auto]">
      {" "}
      <div>
        <div>
          <div>
            <div className="pb-4 px-4 xl:px-0">
              <div className="  h-[17rem] object-cover  md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] 2xl:h-[38rem] w-full sm:h-[29.5rem]  relative">
                <Image
                  fill
                  sizes="(min-width: 640px) 640px,(min-width: 768px) 435px,(min-width: 1024px) 691px,(min-width: 1280px) 867px,(min-width: 1536px) 835px, 390px"
                  src={currentPost.imageurl}
                  style={{ objectFit: "cover" }}
                  quality={75}
                  alt={currentPost.imagealt}
                  priority
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(300, 300)
                  )}`}
                />
              </div>
            </div>
            {/* <img
              className="px-4 pb-4 h-[17rem] object-cover  md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] 2xl:h-[38rem] w-full sm:h-[29.5rem] xl:px-0"
              src={currentPost.imageurl}
              alt={currentPost.imagealt}
            /> */}
            <Link
              href={`/${
                currentPost.section !== "null" ? currentPost.section + "/" : ""
              }${
                currentPost.subsection !== "null"
                  ? currentPost.subsection + "/"
                  : ""
              }${
                currentPost.subsubsection !== "null"
                  ? currentPost.subsubsection + "/"
                  : ""
              }`}
            >
              <h1 className="font-semibold   mx-4 pb-2 text-sm tracking-wider text-[#004ff2] hidden md:flex xl:mx-0 hover:text-[#3a8cfb]">
                {DeSlugify(
                  decodedslug[decodedslug.length - 2]
                )[0].toUpperCase() +
                  DeSlugify(decodedslug[decodedslug.length - 2]).slice(1)}
              </h1>
            </Link>
            <h1 className="text-2xl mx-4 xl:mx-0  font-semibold border-b-[0.1px] pb-4 mb-6 border-gray-500  capitalize sm:text-[25px] md:text-[30px] lg:text-[32px] xl:pb-6">
              {DeSlugify(decodedslug[decodedslug.length - 1])}
            </h1>{" "}
            <div className="lg:flex lg:pb-4">
              <div className="mx-4 text-xs tracking-wider flex flex-col gap-2 pb-4 xl:mx-0">
                <h1 className="font-semibold">
                  By <span className="underline ">{currentPost.author}</span>
                </h1>
                <h2 className=" font-normal text-gray-600">
                  Published:{" "}
                  {date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider mb-4 px-4 lg:w-[45%] lg:ml-auto xl:px-0 2xl:w-[40%]">
                <CopyBtn
                  text={`/${
                    currentPost.section !== "null"
                      ? currentPost.section + "/"
                      : ""
                  }${
                    currentPost.subsection !== "null"
                      ? currentPost.subsection + "/"
                      : ""
                  }${
                    currentPost.subsubsection !== "null"
                      ? currentPost.subsubsection + "/"
                      : ""
                  }${currentPost.title}`}
                />
                <ShareBtn
                  text={(currentPost?.seo as SEOType).ogDescription}
                  url={currentPost.imageurl}
                  title={currentPost.title}
                />
              </div>
            </div>
          </div>
          {currentPost.content?.map((item, i) => {
            const contentItem = item as ContentItem;
            return (
              <div key={i} className="flex flex-col  pb-6 px-4 xl:px-0">
                {/* <h1
                className={`${
                  i == 0 && "hidden"
                } text-[18.72px] pb-6 font-semibold `}
              > */}
                {/* {contentItem.title != null ||
                  (contentItem.title != "null" && (
                    <h1
                      className={`${
                        contentItem.title == "Introduction" && "hidden"
                      } text-[18.72px]  font-semibold `}
                    >
                      {contentItem.title}
                    </h1>
                  ))} */}
                {contentItem.description && (
                  <div className="leading-[1.7rem] font-[330] text-black mb-4">
                    <MarkdownComponent text={contentItem.description} />
                  </div>
                )}
                {contentItem.url == "null" ||
                contentItem.url == null ||
                contentItem.alt == "null" ||
                contentItem.alt == null ? null : (
                  <div className=" flex flex-col gap-2">
                    <div className=" h-[17rem] object-contain md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] sm:h-[28.5rem] 2xl:h-[38rem] relative w-full">
                      <Image
                        fill
                        sizes="(min-width: 640px) 608px,(min-width: 768px) 403px,(min-width: 1024px) 659px,(min-width: 1280px) 867px,(min-width: 1536px) 835px, 358px"
                        src={contentItem.url}
                        style={{ objectFit: "contain" }}
                        quality={75}
                        alt={contentItem.alt}
                        priority
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(300, 300)
                        )}`}
                      />
                    </div>
                    {/* <img
                      // className="h-[17rem] object-contain md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] sm:h-[28.5rem] 2xl:h-[38rem]"
                      className="max-h-[17rem] object-contain md:max-h-[21rem] lg:max-h-[31.5rem] xl:max-h-[39.5rem] sm:max-h-[28.5rem] 2xl:max-h-[38rem]"
                      src={contentItem.url}
                      alt=""
                    /> */}
                    <p className="text-gray-500 font-light text-sm">
                      {contentItem.alt} | Image: Supplied
                    </p>
                  </div>
                )}
                {/* {i == 2 && (
                  <h1 className="px-4 py-4 mt-4 italic bg-[#eeeff1]">
                    {currentPost.quote}
                  </h1>
                )}{" "} */}
              </div>
            );
          })}{" "}
          <h1 className="px-4 py-4 my-4 italic bg-[#eeeff1]">
            {currentPost.quote}
          </h1>
        </div>{" "}
        <div className="bg-[#eeeff1] py-8 px-4  hidden md:flex md:flex-col">
          <h1 className="text-lg font-semibold text-center pb-4">
            Related Stories
          </h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {latposts?.map((item, i) => {
              return (
                <div key={i} className="grid grid-cols-[100px_auto] gap-4">
                  <Link
                    href={`/${
                      item.section !== "null"
                        ? item.section.toLowerCase() + "/"
                        : ""
                    }${
                      item.subsection !== "null"
                        ? item.subsection.toLowerCase() + "/"
                        : ""
                    }${
                      item.subsubsection !== "null"
                        ? item.subsubsection.toLowerCase() + "/"
                        : ""
                    }${item.title.toLowerCase()}`}
                  >
                    <div className="w-full h-[75px] relative">
                      <Image
                        fill
                        sizes="100px"
                        src={item.imageurl}
                        style={{ objectFit: "cover" }}
                        quality={75}
                        alt={item.imagealt}
                        priority
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(300, 300)
                        )}`}
                      />
                    </div>
                    {/* <img
                      className="object-cover w-full h-[75px]"
                      src={item.imageurl}
                      alt=""
                    /> */}
                  </Link>
                  <div className="flex flex-col gap-2 md:gap-2 w-full">
                    {item.subsubsection ? (
                      <Link
                        href={`/${
                          item.section !== "null"
                            ? item.section.toLowerCase() + "/"
                            : ""
                        }${
                          item.subsection !== "null"
                            ? item.subsection.toLowerCase() + "/"
                            : ""
                        }${
                          item.subsubsection !== "null"
                            ? item.subsubsection.toLowerCase() + "/"
                            : ""
                        }`}
                      >
                        {" "}
                        <h1 className="text-xs text-[#1750d3] font-semibold tracking-wider hover:text-[#3a8cfb]">
                          {DeSlugify(item.subsubsection)}
                        </h1>
                      </Link>
                    ) : item.subsection ? (
                      <Link
                        href={`/${
                          item.section !== "null"
                            ? item.section.toLowerCase() + "/"
                            : ""
                        }${
                          item.subsection !== "null"
                            ? item.subsection.toLowerCase() + "/"
                            : ""
                        }`}
                      >
                        <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider hover:text-[#3a8cfb]">
                          {DeSlugify(item.subsection)}
                        </h1>
                      </Link>
                    ) : (
                      <Link
                        href={`/${
                          item.section !== "null"
                            ? item.section.toLowerCase() + "/"
                            : ""
                        }`}
                      >
                        {" "}
                        <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider hover:text-[#3a8cfb]">
                          {DeSlugify(item.section)}
                        </h1>
                      </Link>
                    )}{" "}
                    <Link
                      href={`/${
                        item.section !== "null"
                          ? item.section.toLowerCase() + "/"
                          : ""
                      }${
                        item.subsection !== "null"
                          ? item.subsection.toLowerCase() + "/"
                          : ""
                      }${
                        item.subsubsection !== "null"
                          ? item.subsubsection.toLowerCase() + "/"
                          : ""
                      }${item.title.toLowerCase()}`}
                    >
                      <h1 className="text-sm font-semibold line-clamp-2  hover:text-[#004ff2]">
                        {DeSlugify(item.title)}
                      </h1>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>{" "}
      </div>
      <div className="bg-[#eeeff1] py-8 px-4 md:bg-[#ffffff] xl:pr-0">
        <h1 className="text-lg font-semibold text-center pb-4">
          Related Stories
        </h1>
        <div className="flex flex-col gap-4">
          {posts?.map((item, i) => {
            return (
              <div key={i} className="grid grid-cols-[100px_auto] gap-4">
                <Link
                  href={`/${
                    item.section !== "null"
                      ? item.section.toLowerCase() + "/"
                      : ""
                  }${
                    item.subsection !== "null"
                      ? item.subsection.toLowerCase() + "/"
                      : ""
                  }${
                    item.subsubsection !== "null"
                      ? item.subsubsection.toLowerCase() + "/"
                      : ""
                  }${item.title.toLowerCase()}`}
                >
                  <div className="w-full h-[75px] relative">
                    <Image
                      fill
                      sizes="100px"
                      src={item.imageurl}
                      style={{ objectFit: "cover" }}
                      quality={75}
                      alt={item.imagealt}
                      priority
                      placeholder={`data:image/svg+xml;base64,${toBase64(
                        shimmer(300, 300)
                      )}`}
                    />
                  </div>
                  {/* <img
                    className="object-cover w-full h-[75px]"
                    src={item.imageurl}
                    alt=""
                  /> */}
                </Link>
                <div className="flex flex-col gap-2 md:gap-2 w-full">
                  {item.subsubsection ? (
                    <Link
                      href={`/${
                        item.section !== "null"
                          ? item.section.toLowerCase() + "/"
                          : ""
                      }${
                        item.subsection !== "null"
                          ? item.subsection.toLowerCase() + "/"
                          : ""
                      }${
                        item.subsubsection !== "null"
                          ? item.subsubsection.toLowerCase() + "/"
                          : ""
                      }`}
                    >
                      {" "}
                      <h1 className="text-xs text-[#1750d3] font-semibold tracking-wider hover:text-[#3a8cfb]">
                        {DeSlugify(item.subsubsection)}
                      </h1>
                    </Link>
                  ) : item.subsection ? (
                    <Link
                      href={`/${
                        item.section !== "null"
                          ? item.section.toLowerCase() + "/"
                          : ""
                      }${
                        item.subsection !== "null"
                          ? item.subsection.toLowerCase() + "/"
                          : ""
                      }`}
                    >
                      <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider hover:text-[#3a8cfb]">
                        {DeSlugify(item.subsection)}
                      </h1>
                    </Link>
                  ) : (
                    <Link
                      href={`/${
                        item.section !== "null"
                          ? item.section.toLowerCase() + "/"
                          : ""
                      }`}
                    >
                      {" "}
                      <h1 className="text-xs text-[#1e50ce] font-semibold tracking-wider hover:text-[#3a8cfb]">
                        {DeSlugify(item.section)}
                      </h1>
                    </Link>
                  )}{" "}
                  <Link
                    href={`/${
                      item.section !== "null"
                        ? item.section.toLowerCase() + "/"
                        : ""
                    }${
                      item.subsection !== "null"
                        ? item.subsection.toLowerCase() + "/"
                        : ""
                    }${
                      item.subsubsection !== "null"
                        ? item.subsubsection.toLowerCase() + "/"
                        : ""
                    }${item.title.toLowerCase()}`}
                  >
                    <h1 className="text-sm font-semibold line-clamp-2 hover:text-[#004ff2] ">
                      {DeSlugify(item.title)}
                    </h1>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogDisplay;

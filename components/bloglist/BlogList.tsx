import DeSlugify from "@/libs/DeSlugify";
import { shimmer, toBase64 } from "@/libs/Shimmer";
import { FoodBlogs } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const freight = localFont({
  src: "../../app/fonts/freight-neo-pro-book.otf",
});

type JsonValue = string | number | boolean | null;
interface posts {
  posts: FoodBlogs[];
}

function BlogList({ posts }: posts) {
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6   xl:max-w-[73rem] mx-auto w-full lg:gap-x-4 xl:gap-y-10">
        {posts.map((item, index) => {
          // const myBlurDataUrl = await getBase64(item.imageurl);

          return (
            //         <div key={index} className="pt-4 bg-[#eeeff16b] p-2 rounded-md">
            //           <Link
            //             href={`/${
            //               item.section !== "null"
            //                 ? item.section.toLowerCase() + "/"
            //                 : ""
            //             }${
            //               item.subsection !== "null"
            //                 ? item.subsection.toLowerCase() + "/"
            //                 : ""
            //             }${
            //               item.subsubsection !== "null"
            //                 ? item.subsubsection.toLowerCase() + "/"
            //                 : ""
            //             }${item.title.toLowerCase()}`}
            //           >
            //             <div className="h-[75vw] w-full  lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem] relative">
            //               <Image
            //                 fill
            //                 sizes="(min-width: 640px) 608px,(min-width: 768px) 362px,(min-width: 1024px) 233px,(min-width: 1280px) 277px,(min-width: 1536px) 277px, 358px"
            //                 src={item.imageurl}
            //                 style={{ objectFit: "cover" }}
            //                 // quality={1}
            //                 alt={item.imagealt}
            //                 // loading="eager"
            //                 // fetchPriority="high"
            //                 quality={75}
            //                 priority={false}
            //                 loading="lazy"
            //                 // objectFit="contain"
            //                 // placeholder={`data:image/svg+xml;base64,${toBase64(
            //                 //   shimmer(300, 300)
            //                 // )}`}

            //                 // blurDataURL={myBlurDataUrl}
            //               />{" "}
            //             </div>
            //             {/* <img
            //             className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem]"
            //             src={item.imageurl}
            //             alt={item.imagealt}
            //           /> */}
            //           </Link>{" "}
            //           <div className="flex pt-4 pb-1 ">
            //             <Link
            //               href={`/${
            //                 item.section !== "null"
            //                   ? item.section.toLowerCase() + "/"
            //                   : ""
            //               }${
            //                 item.subsection !== "null"
            //                   ? item.subsection.toLowerCase() + "/"
            //                   : ""
            //               }${
            //                 item.subsubsection !== "null"
            //                   ? item.subsubsection.toLowerCase() + "/"
            //                   : ""
            //               }`}
            //             >
            //               <h1 className="text-sm text-[#004ff2] px-2  font-semibold tracking-wider  hover:text-[#3a8cfb] rounded-full border-[1px] border-slate-400">
            //                 {DeSlugify(item.subsection)}
            //               </h1>
            //             </Link>
            //           </div>
            //           <Link
            //             href={`/${
            //               item.section !== "null"
            //                 ? item.section.toLowerCase() + "/"
            //                 : ""
            //             }${
            //               item.subsection !== "null"
            //                 ? item.subsection.toLowerCase() + "/"
            //                 : ""
            //             }${
            //               item.subsubsection !== "null"
            //                 ? item.subsubsection.toLowerCase() + "/"
            //                 : ""
            //             }${item.title.toLowerCase()}`}
            //           >
            //             <h2 className="font-semibold hover:text-[#004ff2]">
            //               {DeSlugify(item.title)}
            //             </h2>
            //           </Link>
            //         </div>
            //       );
            //     })}
            //   </div>
            // </div>
            <div key={index} className="mt-4   flex flex-col  ">
              {" "}
              <div>
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
                  <div className="h-[75vw] w-full  lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem] relative ">
                    <Image
                      className="rounded-xl"
                      fill
                      sizes="(min-width: 640px) 608px,(min-width: 768px) 362px,(min-width: 1024px) 233px,(min-width: 1280px) 277px,(min-width: 1536px) 277px, 358px"
                      src={item.imageurl}
                      style={{ objectFit: "cover" }}
                      // quality={1}
                      alt={item.imagealt}
                      // loading="eager"
                      // fetchPriority="high"
                      quality={75}
                      priority={false}
                      loading="lazy"
                      // objectFit="contain"
                      // placeholder={`data:image/svg+xml;base64,${toBase64(
                      //   shimmer(300, 300)
                      // )}`}

                      // blurDataURL={myBlurDataUrl}
                    />{" "}
                  </div>
                  {/* <img
      className="h-[75vw] object-cover w-full pb-4 lg:h-[12rem] xl:h-[13rem] md:h-[17rem] sm:h-[29rem]"
      src={item.imageurl}
      alt={item.imagealt}
    /> */}
                </Link>{" "}
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
                  <h1
                    className={`text-sm   pt-3   hover:text-[#3a8cfb]  text-slate-400 ${freight.className}`}
                  >
                    {DeSlugify(item.subsection)}
                  </h1>
                </Link>
              </div>
              <div className="pt-1 ">
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
                  <h2
                    className={`font-extrabold hover:text-[#004ff2] text-slate-800  ${freight.className}`}
                  >
                    {DeSlugify(item.title)}
                  </h2>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogList;

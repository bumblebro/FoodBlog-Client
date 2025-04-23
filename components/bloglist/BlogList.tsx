import DeSlugify from "@/libs/DeSlugify";
import { shimmer, toBase64 } from "@/libs/Shimmer";
import { FoodBlogs } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
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
  src: "../../app/fonts/freight-neo-pro-book.otf",
});

type JsonValue = string | number | boolean | null;
interface posts {
  posts: FoodBlogs[];
}

function BlogList({ posts }: posts) {
  return (
    <div className="  mx-auto mb-10   w-full px-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4    xl:max-w-[73rem] mx-auto w-full lg:gap-x-6 xl:gap-y-2">
        {posts.map((item, index) => {
          // const myBlurDataUrl = await getBase64(item.imageurl);

          return (
            <div
              key={index}
              className="mt-4   flex flex-col shadow-md rounded-lg"
            >
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
                  <div className="h-[55vw] w-full  lg:h-[12rem] xl:h-[22rem] md:h-[17rem] sm:h-[29rem] relative ">
                    <Image
                      className="rounded-t-lg"
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
                    <div className=" text-[8px] absolute bg-white px-2 pt-1 bottom-0 rounded-se-md flex items-center gap-2">
                      <svg
                        className=" h-4 md:h-6 "
                        viewBox="0 0 64.00 64.00"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <circle cx="32" cy="32" r="24"></circle>
                          <polyline points="40 44 32 32 32 16"></polyline>
                        </g>
                      </svg>
                      <h1>
                        {(() => {
                          const prepTimeInSeconds = parseInt(
                            (
                              (item.recipedetails as Record<string, any>)["1X"]
                                ?.preparationTime || 0
                            ).toString()
                          );

                          const totalMinutes = Math.floor(
                            prepTimeInSeconds / 60
                          );
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;

                          return hours > 0
                            ? `${hours} hr${
                                hours > 1 ? "s" : ""
                              } ${minutes} min${minutes !== 1 ? "s" : ""}`
                            : `${minutes} min${minutes !== 1 ? "s" : ""}`;
                        })()}
                      </h1>
                    </div>
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
                    className={`text-sm   pt-3 px-2  hover:underline   ${Poppins400.className}`}
                  >
                    {DeSlugify(item.subsection)}
                  </h1>
                </Link>
                {/* <h1>{Math.floor(parseInt(item.recipedetails?.["1X"]?.preparationTime) / 60)} minutes</h1> */}
              </div>
              <div className="pb-2 ">
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
                    className={` text-[15px] md:text-[20px]  hover:underline text-[rgb(26, 29, 30)]  ${Poppins700.className} px-2`}
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

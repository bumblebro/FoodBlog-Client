import { FoodBlogs } from "@prisma/client";
import Link from "next/link";
import CopyBtn from "../ClientComponents/CopyBtn";
import ShareBtn from "../ClientComponents/ShareBtn";
import DeSlugify from "@/libs/DeSlugify";
import MarkdownComponent from "../Markdown";
import Image from "next/image";
import { shimmer, toBase64 } from "@/libs/Shimmer";
import RecipePage from "../RecipePage";
import Buttons from "../Buttons";
import { FAQSection } from "../FAQSection";
import ShareButtons from "../ShareButtons";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import AdCode from "../AdCode";
import { DisplayAdUnit } from "../Ads/ad-unit";
// import GoogleAdUnit from "../GoogleAdUnit";
// Poppins
const Poppins700 = Poppins({
  weight: "700",
  subsets: ["latin"],
  // display: "swap",
});

const Poppins400 = Poppins({
  weight: "400",
  subsets: ["latin"],
  // display: "swap",
});

// const font = Nunito_Sans({
//   weight: "400",
//   subsets: ["latin"],
//   // display: "swap",
// });

const freight = localFont({
  src: "../../app/fonts/freight-neo-pro-book.otf",
});

const freightlight = localFont({
  src: "../../app/fonts/fonnts.com-FreightNeo_Pro_Light.otf",
});

const freightbig = localFont({
  src: "../../app/fonts/Freight Big Pro Medium Italic.otf",
});

const freightbigstraight = localFont({
  src: "../../app/fonts/Freight Big Pro Medium.otf",
});

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
  currentPost: FoodBlogs;
  posts: FoodBlogs[];
  latposts: FoodBlogs[];
}

function BlogDisplay({ decodedslug, currentPost, posts, latposts }: BlogDisp) {
  const date = new Date(currentPost.creationDate);

  // const domain = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(
  //   /^https:/,
  //   "http:"
  // );
  // const imageUrl =
  //   domain +
  //   "/api/og?" +
  //   "title=" +
  //   encodeURIComponent((currentPost?.seo as SEOType)?.ogTitle || "") +
  //   "&description=" +
  //   encodeURIComponent((currentPost?.seo as SEOType)?.ogDescription || "") +
  //   "&cover=" +
  //   encodeURIComponent(currentPost?.imageurl || "");

  // const urllink = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${
  //   currentPost.section !== "null" ? currentPost.section + "/" : ""
  // }${currentPost.subsection !== "null" ? currentPost.subsection + "/" : ""}${
  //   currentPost.subsubsection !== "null" ? currentPost.subsubsection + "/" : ""
  // }${currentPost.title}`;

  return (
    <div
      className={` xl:max-w-[73rem] mx-auto  mb-10 md:grid md:grid-cols-[56.7%_auto] lg:grid-cols-[67.5%_auto] xl:grid-cols-[74.25%_auto] xl:gap-2 2xl:grid-cols-[71.5%_auto] ${Poppins400.className}`}
    >
      {" "}
      <div>
        <div>
          <div>
            <div className="pb-4 px-4 xl:px-0">
              <div className="  h-[17rem] object-cover  md:h-[21rem] lg:h-[31.5rem] xl:h-[39.5rem] 2xl:h-[38rem] w-full sm:h-[29.5rem]  relative">
                <Image
                  className="rounded-xl"
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
              <h1 className="font-semibold   mx-4 pb-2 text-sm text-black hidden md:flex xl:mx-0 hover:underline">
                {DeSlugify(
                  decodedslug[decodedslug.length - 2]
                )[0].toUpperCase() +
                  DeSlugify(decodedslug[decodedslug.length - 2]).slice(1)}
              </h1>
            </Link>
            <h1
              className={`text-2xl mx-4 xl:mx-0  border-b-[0.1px] pb-4 mb-6 border-gray-500  capitalize sm:text-[25px] md:text-[30px] lg:text-[35px] xl:pb-6 ${Poppins700.className}`}
            >
              {DeSlugify(decodedslug[decodedslug.length - 1])}
            </h1>{" "}
            <div className="lg:flex lg:pb-4">
              <div className="mx-4 text-xs  flex flex-col gap-2 pb-4 xl:mx-0">
                <div className="font-semibold flex gap-1">
                  <h1 className={`${Poppins700.className}`}>By:</h1>{" "}
                  {/* <span className="underline p-author ">
                    {currentPost.author}
                  </span> */}{" "}
                  <span className="underline p-author ">Savory Touch</span>
                </div>
                <div className=" text-black  dt-published flex gap-2">
                  <h1 className={`${Poppins700.className}`}>Published:</h1>{" "}
                  <span>
                    {" "}
                    {date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold  mb-4 px-4 lg:w-[45%] lg:ml-auto xl:px-0 2xl:w-[40%]">
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
                  url={`${process.env.NEXT_PUBLIC_BASE_API_URL}/${
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
                  title={currentPost.title}
                />
              </div>
            </div>
          </div>
          {/* <button className="px-5 py-2 bg-[#b5651d] text-white font-serif rounded-full shadow-md hover:bg-[#8a4f1d] transition-all">
            📜 Jump to Recipe
          </button>
          <button className="px-5 py-2 bg-[#6b4226] text-white font-serif rounded-full shadow-md hover:bg-[#4e2f1d] transition-all">
            💾 Save Recipe
          </button> */}
          <Buttons />
          <DisplayAdUnit format="auto" />
          {/* <ShareButtons urllink={urllink} imageUrl={imageUrl} /> */}
          {/* <button className="bg-red-400">
            {" "}
            <a
              href="https://www.pinterest.com/pin/create/button/"
              data-pin-do="buttonBookmark"
              target="_blank"
              rel="noopener"
            >
              Pin
            </a>
          </button> */}
          {/* <img
            className="w-[358px] sm:w-[608px] md:w-[403px] lg:w-[659px] xl:w-[867px] 2xl:w-[835px]"
            src={imageUrl}
            alt="ssss"
          /> */}
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
                  <div
                    className={`  mb-4 ${Poppins400.className}  font-medium leading-[27px]`}
                  >
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
                    {/* 
                    <p className="text-gray-500 font-light text-sm">
                      {contentItem.alt} | Image: Supplied
                    </p> */}
                  </div>
                )}
              </div>
            );
          })}{" "}
          {currentPost.equipments && currentPost.equipments.length > 0 && (
            <div className="px-6 py-5 bg-white  rounded-2xl mb-2 border-black border-2 mx-2">
              <h2
                className={`text-xl font-medium text-gray-900 pb-3 ${Poppins700.className}`}
              >
                Required Equipments
              </h2>
              <ul className=" rounded-lg py-3  flex flex-col gap-2  list-disc ">
                {currentPost.equipments.map((equipment, i) => (
                  <li key={i} className="flex items-center  ">
                    {equipment}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* <AdCode>
            {" "}
            <ins
              className="adsbygoogle"
              // style={{ display: "block" }}
              style={{ display: "block" }}
              data-ad-client="ca-pub-5012580427673167"
              data-ad-slot="3048648789"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </AdCode>{" "} */}
          <DisplayAdUnit format="auto" />
          {/* <GoogleAdPcItem key={2 + "ads"} adId={`ad-slot-${2}`} /> */}
          <RecipePage currentPost={currentPost} />
          {currentPost.faq && (currentPost.faq as any[]).length > 0 && (
            <FAQSection faqs={currentPost.faq} />
          )}
          <h1 className="px-4 py-4 my-4 italic ">{currentPost.quote}</h1>
        </div>{" "}
        <div className=" py-8 px-4  hidden md:flex md:flex-col">
          {/* <AdCode>
            {" "}
            <ins
              className="adsbygoogle"
              // style={{ display: "block" }}
              style={{ display: "block" }}
              data-ad-client="ca-pub-5012580427673167"
              data-ad-slot="3048648789"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </AdCode>{" "} */}
          <DisplayAdUnit format="rectangle" />
          <h1
            className={`text-2xl font-semibold text-center py-4 mb-4 ${Poppins700.className} bg-[#8D6271]  text-white rounded-md`}
          >
            Related Stories
          </h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {latposts?.map((item, i) => {
              // const shouldInsertAd = Math.random() < 0.1;
              // if (shouldInsertAd) {
              //   return (
              //     <div
              //       key={i}
              //       className="mt-4  shadow-md rounded-lg w-full h-full"
              //     >
              //       <GoogleAdUnit>
              //         <ins
              //           className="adsbygoogle"
              //           style={{ display: "block" }}
              //           data-ad-client="ca-pub-5012580427673167"
              //           data-ad-slot={3048648789}
              //           data-ad-format="auto"
              //           data-full-width-responsive="true"
              //         />
              //       </GoogleAdUnit>
              //     </div>
              //   );
              // }
              return (
                <div
                  key={i}
                  className={`grid grid-cols-[100px_auto] gap-4 ${Poppins400.className} shadow-md rounded-lg`}
                >
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
                        className="rounded-l-lg"
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
                  <div className="flex flex-col gap-2 md:gap-2 w-full ">
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
                        <h1 className="text-xs text-black font-semibold  hover:underline pt-2">
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
                        <h1 className="text-xs text-black  font-semibold  hover:underline pt-2">
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
                        <h1 className="text-xs text-black  font-semibold  hover:underline pt-2">
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
                      <h1
                        className={`text-sm font-medium line-clamp-2  hover:underline  ${Poppins700.className}`}
                      >
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
      <div className="py-8 px-4 md:bg-[#ffffff] xl:pr-0">
        {/* <AdCode>
          {" "}
          <ins
            className="adsbygoogle"
            // style={{ display: "block" }}
            style={{ display: "block" }}
            data-ad-client="ca-pub-5012580427673167"
            data-ad-slot="3048648789"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </AdCode>{" "} */}
        <DisplayAdUnit format="rectangle" />
        <h1
          className={`text-lg font-semibold text-center py-4 mb-4 ${Poppins700.className}  bg-[#8D6271]  text-white rounded-md`}
        >
          Related Stories
        </h1>
        <div className="flex flex-col gap-4">
          {posts?.map((item, i) => {
            // const shouldInsertAd = Math.random() < 0.1;
            // if (shouldInsertAd) {
            //   return (
            //     <div
            //       key={i}
            //       className="mt-4  shadow-md rounded-lg w-full h-full"
            //     >
            //       <GoogleAdUnit>
            //         <ins
            //           className="adsbygoogle"
            //           style={{ display: "block" }}
            //           data-ad-client="ca-pub-5012580427673167"
            //           data-ad-slot={3048648789}
            //           data-ad-format="auto"
            //           data-full-width-responsive="true"
            //         />
            //       </GoogleAdUnit>
            //     </div>
            //   );
            // }
            return (
              <div
                key={i}
                className={`grid grid-cols-[100px_auto] gap-4 ${Poppins400.className} shadow-md rounded-lg`}
              >
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
                      className="rounded-l-lg"
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
                <div className="flex flex-col gap-2 md:gap-2 w-full ">
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
                      <h1 className="text-xs text-black font-semibold  hover:underline ">
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
                      <h1 className="text-xs text-black  font-semibold  hover:underline ">
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
                      <h1 className="text-xs text-black  font-semibold  hover:underline">
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
                    <h1
                      className={`text-sm font-medium line-clamp-2 hover:underline  ${Poppins700.className}`}
                    >
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

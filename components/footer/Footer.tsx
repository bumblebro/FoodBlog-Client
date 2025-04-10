"use client";
import Link from "next/link";

import localFont from 'next/font/local'


import { FacebookIcon, PinterestIcon, TwitterIcon } from "react-share";

const freight = localFont({
  src: '../../app/fonts/freight-neo-pro-book.otf',
})

const freightbig = localFont({
  src: '../../app/fonts/Freight Big Pro Medium Italic.otf',
})

function Footer() {
  return (
    <div className={`bg-[#F0F1F3] text-[#000000] ${freight.className}`}>
      <div className="pt-11 pb-20 text-white text-center flex flex-col gap-14 px-4 mx-auto xl:max-w-[73rem] ">
        <div className="flex flex-col items-center gap-3 ">
          <h1 className="text-md font-medium text-[#000000]">
            Want to join our exclusive community?
          </h1>
          <span className="w-1/12 border-b mb-1"></span>
          <form
            onSubmit={(e) => {
              alert("Subscribed!");
            }}
            className="flex flex-col  gap-3 md:flex-row w-full md:w-[70%] md:gap-0   2xl:w-[50%]"
          >
            <input
              className="  placeholder-slate-500 font-light w-full rounded-md py-2 text-center  md:text-start md:pl-4 md:rounded-r-none text-black"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-[#ee5631] text-black w-full rounded-md py-2 text-center font-semibold md:w-[50%]  2xl:w-[40%] md:rounded-l-none hover:bg-[#ff8769]"
            >
              Subscribe
            </button>
          </form>
        </div>
        <span className="w-full border-gray-600 border-[0.1px]"></span>
        <div className="flex flex-col  font-normal text-sm gap-4 md:flex-row md:justify-between md:items-center text-[#000000]">
          {" "}
          <div className="gap-4 flex flex-col md:text-start">
            <Link className="hover:text-[#004ff2] uppercase" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-[#004ff2] uppercase" href={"/about"}>
              About Us
            </Link>{" "}
            <Link className="hover:text-[#004ff2] uppercase" href={"/contact"}>
              Contact Us
            </Link>
            {/* <Link className="hover:text-[#004ff2]" href={"/advertise"}>
              Advertise With Us
            </Link> */}{" "}
          </div>
          <div className="gap-4 flex flex-col md:text-end">
            <Link className="hover:text-[#004ff2] uppercase" href={"/privacy-policy"}>
              Privacy Policy
            </Link>
            {/* <Link className="hover:text-[#004ff2]" href={"/website-disclaimer"}>
              Disclaimer
            </Link>{" "} */}
            <Link className="hover:text-[#004ff2] uppercase " href={"/terms"}>
              Terms and Conditions
            </Link>
          </div>
        </div>{" "}
        <div className="flex flex-row items-center gap-3 mx-auto md:mx-0 text-[#000000]">
          <h1 className="flex justify-start text-sm font-semibold">
            FOLLOW US
          </h1>
          <div className="flex gap-4  ">
            <a
              href="https://www.facebook.com/profile.php?id=61574819005948"
              target="_blank"
            >
              <FacebookIcon size={32} round={true} />
            </a>{" "}
            <a href="https://in.pinterest.com/SavoryTouchBlog/" target="_blank">
              {" "}
              <PinterestIcon size={32} round={true} />
            </a>
          </div>
        </div>
        <p className={`font-light text-sm italic px-4 text-center text-[#000000] ${freight.className}`}>
          SavoryTouch offers general content intended solely for informational
          purposes. The information provided on this site is not a substitute
          for professional nutritional, dietary, or culinary advice. Always seek
          the advice of qualified professionals regarding any dietary concerns,
          health conditions, or food-related decisions.
        </p>{" "}
        <p className="font-light text-sm  xl:w-[50%] text-center mx-auto text-[#000000] uppercase">
          © 2025 SavoryTouch. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

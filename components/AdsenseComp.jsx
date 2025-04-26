"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

const AdsenseComp = () => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (process.env.NODE_ENV == "development") {
    return <></>;
  }

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log("AdsenseComp -> router changed ", url);

    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5457433644037438"]'
    );

    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          console.log("pushing ads ");
          adsbygoogle.push({});
        } else {
          scriptElement.addEventListener("load", handleScriptLoad);
          console.log(
            "waiting until adsense lib is loaded...This prevents adsbygoogle is not defined error"
          );
        }
      } catch (err) {
        console.log(
          "error in adsense - This prevents ad already exists error",
          err
        );
      }
    };

    handleScriptLoad();
    // Wait for script to load

    return () => {
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleScriptLoad);
      }
    };
  }, [pathname, searchParams]);

  return (
    <div style={{ overflow: "hidden", margin: "5px" }}>
      Google Ad block
      <ins
        className="adsbygoogle"
        // style={{ display: "block" }}
        style={{ display: "block" }}
        data-ad-client="ca-pub-5012580427673167"
        data-ad-slot="3048648789"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdsenseComp;

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import React from "react";

// declare global {
//   interface Window {
//     adsbygoogle: any;
//   }
// }

const GoogleAdPcItem = ({ adId }: { adId: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adsLoaded = useRef<any>(false);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log("AdsenseComp -> router changed ", url);
    const loadAd = () => {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        adsLoaded.current = true;
      }
    };

    if (!adsLoaded.current) {
      setTimeout(loadAd, 0);
    }
  }, [pathname, searchParams]);

  return (
    <div
      className="googleAd-container flex items-center justify-center border rounded-md"
      // style={{ maxWidth: "282px", maxHeight: "282px" }}
    >
      <ins
        key={adId}
        ref={adsLoaded}
        id={adId}
        className="adsbygoogle h-full"
        style={{ display: "inline-block", width: "282px", height: "282px" }}
        data-ad-client="ca-pub-5012580427673167"
        data-ad-slot="3048648789"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAdPcItem;

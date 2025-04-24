// "use client";

// import { usePathname, useSearchParams } from "next/navigation";
// import { Fragment, ReactNode, useEffect } from "react";

// function GoogleAdUnitClient({
//   isProduction,
//   children,
// }: {
//   isProduction: boolean;
//   children: ReactNode;
// }) {
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (isProduction) {
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     } else console.log("Currently in Development");
//   }, [pathName, searchParams, isProduction]);

//   return <Fragment>{children}</Fragment>;
// }

// export default GoogleAdUnitClient;

"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export type GoogleAdUnitProps = {
  children: React.ReactNode;
};

declare global {
  interface Window {
    adsbygoogle?: any | any[];
  }
}

const GoogleAdUnitClient: React.FC<GoogleAdUnitProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, [pathname, searchParams]);
  return <React.Fragment>{children}</React.Fragment>;
};

export default GoogleAdUnitClient;

"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Router } from "next/router";

export type GoogleAdUnitProps = {
  children: React.ReactNode;
};

declare global {
  interface Window {
    adsbygoogle?: any | any[];
  }
}

const GoogleAdUnitClient = ({
  isProduction,
  children,
}: {
  isProduction: boolean;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // React.useEffect(() => {
  //   try {
  //     (window.adsbygoogle = window.adsbygoogle || []).push({});
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [pathname, searchParams]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     try {
  //       if (typeof window !== "undefined") {
  //         (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, 100);
  //   return () => clearTimeout(timeout);
  // }, [pathname, searchParams]);

  useEffect(() => {
    const handleRouteChange = () => {
      const intervalId = setInterval(() => {
        try {
          // Check if the 'ins' element already has an ad in it
          if (window.adsbygoogle) {
            window.adsbygoogle.push({});
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing ads: ", err);
          clearInterval(intervalId); // Ensure we clear interval on errors too
        }
      }, 100);
      return () => clearInterval(intervalId); // Clear interval on component unmount
    };

    // Run the function when the component mounts
    handleRouteChange();

    // Subscribe to route changes
    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);

      // Unsubscribe from route changes when the component unmounts
      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return <>{children}</>;
};

export default GoogleAdUnitClient;

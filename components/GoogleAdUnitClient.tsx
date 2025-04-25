"use client";

import React, { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error(err);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return <>{children}</>;
};

export default GoogleAdUnitClient;

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, ReactNode, useEffect } from "react";

function GoogleAdUnitClient({
  isProduction,
  children,
}: {
  isProduction: boolean;
  children: ReactNode;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isProduction) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } else console.log("Currently in Development");
  }, [pathName, searchParams, isProduction]);

  return <Fragment>{children}</Fragment>;
}

export default GoogleAdUnitClient;

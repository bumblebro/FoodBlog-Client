// "use client";

// import { ReactNode, Suspense } from "react";
// import GoogleAdUnitClient from "./GoogleAdUnitClient";

// function GoogleAdUnit({ children }: { children: ReactNode }) {
//   return (
//     <Suspense>
//       <GoogleAdUnitClient isProduction={process.env.NODE_ENV == "production"}>
//         {children}
//       </GoogleAdUnitClient>
//     </Suspense>
//   );
// }

// export default GoogleAdUnit;

"use client";
import React, { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GoogleAdUnit = ({ children }: { children: ReactNode }) => {
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

export default GoogleAdUnit;

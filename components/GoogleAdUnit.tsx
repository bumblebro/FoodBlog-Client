"use client";

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

import React, { Suspense } from "react";
import GoogleAdUnitClient, { GoogleAdUnitProps } from "./GoogleAdUnitClient";

// const GoogleAdUnitClient = React.lazy(() => import('./GoogleAdUnitClient'))

const GoogleAdUnit = ({ children }: GoogleAdUnitProps) => {
  return (
    <Suspense fallback={null}>
      <GoogleAdUnitClient isProduction={process.env.NODE_ENV == "production"}>
        {children}
      </GoogleAdUnitClient>
    </Suspense>
  );
};

export default GoogleAdUnit;

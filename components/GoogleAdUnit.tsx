import React, { Suspense } from "react";
import GoogleAdUnitClient, { GoogleAdUnitProps } from "./GoogleAdUnitClient";

const GoogleAdUnit = ({ children }: GoogleAdUnitProps) => {
  return (
    <Suspense fallback={<div className="text-black">Loading Ad...</div>}>
      <GoogleAdUnitClient isProduction={process.env.NODE_ENV == "production"}>
        {children}
      </GoogleAdUnitClient>
    </Suspense>
  );
};

// export default GoogleAdUnit;

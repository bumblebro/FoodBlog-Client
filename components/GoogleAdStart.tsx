"use client";
import GoogleAdUnit from "./GoogleAdUnit";
import { GoogleAdUnitProps } from "./GoogleAdUnitClient";

function GoogleAdStart({ children }: GoogleAdUnitProps) {
  return <GoogleAdUnit>{children}</GoogleAdUnit>;
}

export default GoogleAdStart;

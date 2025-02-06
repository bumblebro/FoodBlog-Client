"use client";
import { PinterestIcon, PinterestShareButton } from "react-share";

function ShareButtons({ urllink }: any) {
  return (
    <div>
      <PinterestShareButton url={urllink} media={urllink}>
        {" "}
        <PinterestIcon />
      </PinterestShareButton>
    </div>
  );
}

export default ShareButtons;

"use client";
import { useRouter } from "next/navigation";
import React from "react";

class AdCodeWithoutRouter extends React.Component {
  renderAds() {
    console.log("path before:", this.props.router.asPath);
    console.log("path after:", prevProps.router.asPath);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  componentDidMount() {
    console.log("path before:", this.props.router.asPath);
    console.log("path after:", prevProps.router.asPath);
    this.renderAds();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      console.log("path before:", this.props.router.asPath);
      console.log("path after:", prevProps.router.asPath);
      this.renderAds();
    }
  }

  render() {
    console.log("path before:", this.props.router.asPath);
    console.log("path after:", prevProps.router.asPath);
    const { children } = this.props; // Extract children from props

    return (
      // <div className="container mx-auto text-center" aria-hidden={true}>
      <div
        className="adparent"
        align="center"
        style={{ minwidth: "320px", margin: "auto", textAlign: "center" }}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: "(window.adsbygoogle = window.adsbygoogle || []).push({});",
          }}
        ></script>
      </div>
    );
  }
}

const AdCode = ({ children }) => {
  const router = useRouter();
  return <AdCodeWithoutRouter router={router}>{children}</AdCodeWithoutRouter>;
};

export default AdCode;

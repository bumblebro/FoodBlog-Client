"use client";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";
// import { useRouter } from "next/navigation";

class AdCodeWithoutRouter extends React.Component {
  renderAds() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  componentDidMount() {
    this.renderAds();
  }

  componentDidUpdate(prevProps) {
    if (this.props.router.asPath !== prevProps.router.asPath) {
      this.renderAds();
    }
  }

  render() {
    const { children } = this.props; // Extract children from props

    return (
      // <div className="container mx-auto text-center" aria-hidden={true}>
      <div>
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

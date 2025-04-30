"use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const ads = [
//   "Ad 1 - Buy Shoes!",
//   "Ad 2 - Buy Phones!",
//   "Ad 3 - Travel Deals!",
//   "Ad 4 - New Laptops!",
//   "Ad 5 - Discount Sales!",
//   "Ad 6 - Home Decor!",
// ];

// export default function BlogPage() {
//   const [currentAdIndex, setCurrentAdIndex] = useState(0);
//   const [showFloatingAd, setShowFloatingAd] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;

//       // Start showing ad after scrolling 500px
//       if (scrollTop > 500) {
//         setShowFloatingAd(true);
//       } else {
//         setShowFloatingAd(false);
//       }

//       const adChangeDistance = 1000; // Change ad every 1000px scrolled
//       const index = Math.floor(scrollTop / adChangeDistance);
//       setCurrentAdIndex(Math.min(index, ads.length - 1));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Your Blog Content */}

//       {/* Floating Ad (always on screen after some scroll) */}
//       {showFloatingAd && (
//         <div className="fixed top-5 right-5 w-[300px] h-[250px] overflow-hidden z-50">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentAdIndex}
//               initial={{ y: 300 }}
//               animate={{ y: 0 }}
//               exit={{ y: -300 }}
//               transition={{ duration: 0.5 }}
//               className="w-full h-full bg-gray-100 shadow-lg flex items-center justify-center text-xl font-semibold"
//             >
//               {ads[currentAdIndex]}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       )}
//     </>
//   );
// }

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DisplayAdUnit } from "./Ads/ad-unit";

const ads = [
  "Ad 1 - Buy Shoes!",
  "Ad 2 - Buy Phones!",
  "Ad 3 - Travel Deals!",
  "Ad 4 - New Laptops!",
  "Ad 5 - Discount Sales!",
  "Ad 6 - Home Decor!",
];

export default function SideAdComponent() {
  const blogRef = useRef<HTMLDivElement>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showFloatingAd, setShowFloatingAd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const blogElement = blogRef.current;
      if (!blogElement) return;

      const rect = blogElement.getBoundingClientRect();

      // If the blog element's bottom has moved above the top of the viewport
      if (rect.bottom <= 100) {
        setShowFloatingAd(true);
      } else {
        setShowFloatingAd(false);
      }

      const scrollTop = window.scrollY;
      const adChangeDistance = 3000; // Change ad after every 1000px scrolled
      const index = Math.floor(scrollTop / adChangeDistance);
      setCurrentAdIndex(Math.min(index, ads.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Your Blog Content */}
      <div ref={blogRef} className="p-4 max-w-4xl mx-auto">
        {/* Your blog div here */}
      </div>

      {/* Floating Ad */}
      {showFloatingAd && (
        <div className="fixed top-5 right-5 w-[300px] h-[250px] overflow-hidden z-50">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAdIndex}
                initial={{ y: 300 }}
                animate={{ y: 0 }}
                exit={{ y: -300 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full   flex items-center justify-center text-xl font-semibold"
              >
                <DisplayAdUnit format="rectangle" />
                {/* <h1 className="w-[300px] h-[250px] bg-gray-500 "></h1> */}
                {/* {ads[currentAdIndex]} */}
              </motion.div>
            </AnimatePresence>
          </div>{" "}
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
// import html2pdf from "html2pdf.js";

const RecipePage = ({ currentPost }: any) => {
  const [selectedQuantity, setSelectedQuantity] = useState("1X");
  const recipeRef = useRef(null);
  const [html2pdf, setHtml2pdf] = useState<Function | null>(null); // State to hold the html2pdf function

  useEffect(() => {
    async function loadModule() {
      const impmodule = await import("html2pdf.js");
      setHtml2pdf(() => impmodule.default); // Set the html2pdf function
    }
    loadModule();
  }, []);

  const recipeDetails = currentPost.recipedetails?.[selectedQuantity] || {
    ingredients: [],
    instructions: [],
    nutrition: {},
    notes: [],
    yield: "",
    cookTime: "",
    totalTime: "",
    preparationTime: "",
  };
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(recipeDetails.ingredients.length).fill(false)
  );

  const handleCheck = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const options = {
    filename: currentPost.title,
    margin: 0,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const downloadPDF = async () => {
    const content = recipeRef.current;
    html2pdf?.().set(options).from(content).save();
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen px-4 py-4 w-full"
      id="recipeSection"
    >
      <button
        onClick={downloadPDF}
        className="mb-4 px-5 py-2 bg-[#b5651d] text-white font-serif rounded-full shadow-md hover:bg-[#8a4f1d] transition-all"
      >
        📜 Save Recipe
      </button>

      <div
        ref={recipeRef}
        className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 border border-gray-300"
      >
        {/* Recipe Title */}
        <h1 className="text-3xl font-serif text-center font-bold mb-6 text-[#6b4226] p-name">
          {currentPost.title}
        </h1>

        {/* Recipe Description */}
        <p
          className=" text-gray-600 text-center italic mb-6 text-base p-summary
"
        >
          {currentPost.recipedescription}
        </p>

        {/* Yield & Time Info */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">
            ⏳ Yield & Time
          </h2>
          <p className="text-base p-yield">
            <strong>Yield:</strong> {recipeDetails.yield} Servings
          </p>
          <p className="text-base">
            <strong>Preparation Time:</strong>{" "}
            {Math.floor(parseInt(recipeDetails.preparationTime, 10) / 60)}{" "}
            Minutes
          </p>
          <p className="text-base">
            <strong>Cook Time:</strong>{" "}
            {Math.floor(parseInt(recipeDetails.cookTime, 10) / 60)} Minutes
          </p>
          <h1>{recipeDetails.totalTime}</h1>
          <p className="text-base dt-duration">
            <strong>Total Time:</strong> {recipeDetails.totalTime} Minutes
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-center space-x-3 mb-6">
          {["1X", "2X", "3X", "4X"].map((qty) => (
            <button
              key={qty}
              onClick={() => {
                setSelectedQuantity(qty);
                setCheckedItems(
                  new Array(recipeDetails.ingredients.length).fill(false)
                );
              }}
              className={`px-5 py-2 rounded-lg text-base font-semibold transition-all ${
                selectedQuantity === qty
                  ? "bg-[#b5651d] text-white shadow-md"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {qty}
            </button>
          ))}
        </div>

        {/* Ingredients */}
        {/* <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">
            🍽 Ingredients
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            {recipeDetails.ingredients.map((ingredient: any, index: any) => (
              <li key={index} className="text-gray-700 text-base">
                {ingredient.quantity} {ingredient.name}
              </li>
            ))}
          </ul>
        </div> */}

        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">
            🍽 Ingredients
          </h2>
          <ul className="  space-y-2 text-lg">
            {recipeDetails.ingredients.map((ingredient: any, index: any) => (
              <li
                key={index}
                className={`text-gray-700 text-base ${
                  checkedItems[index] ? "line-through" : ""
                }`}
              >
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheck(index)}
                    className="h-4 w-4 text-[#b5651d] checked:bg-[#b5651d] border-[#b5651d] focus:ring-[#b5651d]"
                  />
                  <span
                    className="p-ingredient
"
                  >
                    {ingredient.quantity} {ingredient.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">
            📖 Instructions
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-lg">
            {currentPost.instructions?.map((instruction: any, index: any) => (
              <li
                key={index}
                className="text-gray-700 text-base e-instructions
"
              >
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        {/* Notes */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">📝 Notes</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            {recipeDetails.notes.map((note: any, index: any) => (
              <li key={index} className="text-gray-700 text-base">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Info */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-xl font-serif text-[#6b4226] mb-3">
            🍎 Nutrition
          </h2>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Calories:</strong> {recipeDetails.nutrition.calories}
          </p>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Protein:</strong> {recipeDetails.nutrition.protein}
          </p>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Fat:</strong> {recipeDetails.nutrition.fat}
          </p>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Carbohydrates:</strong>{" "}
            {recipeDetails.nutrition.carbohydrates}
          </p>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Fiber:</strong> {recipeDetails.nutrition.fiber}
          </p>
          <p
            className="text-base p-nutrition
"
          >
            <strong>Calcium:</strong> {recipeDetails.nutrition.calcium}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

// "use client";

// import { useState, useRef, useEffect } from "react";
// // import html2pdf from "html2pdf.js";

// const RecipePage = ({ currentPost }: any) => {
//   const [selectedQuantity, setSelectedQuantity] = useState("1X");
//   const recipeRef = useRef(null);
//   const [Component, setComponent] = useState<JSX.Element>();
//   const recipeDetails = currentPost.recipedetails?.[selectedQuantity] || {
//     ingredients: [],
//     instructions: [],
//     nutrition: {},
//     notes: [],
//     yield: "",
//     cookTime: "",
//     totalTime: "",
//     preparationTime: "",
//   };
//   const [checkedItems, setCheckedItems] = useState<boolean[]>(
//     new Array(recipeDetails.ingredients.length).fill(false)
//   );
//   useEffect(() => {
//     async function loadModule() {
//       const html2pdf = await import("html2pdf.js");

//       const handleCheck = (index: number) => {
//         const newCheckedItems = [...checkedItems];
//         newCheckedItems[index] = !newCheckedItems[index];
//         setCheckedItems(newCheckedItems);
//       };

//       const options = {
//         filename: currentPost.title,
//         margin: 0,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//       };

//       const downloadPDF = async () => {
//         const content = recipeRef.current;
//         html2pdf().set(options).from(content).save();
//       };
//       setComponent(
//         <div
//           className="flex flex-col items-center min-h-screen px-4 py-4 w-full"
//           id="recipeSection"
//         >
//           <button
//             onClick={downloadPDF}
//             className="mb-4 px-5 py-2 bg-[#b5651d] text-white font-serif rounded-full shadow-md hover:bg-[#8a4f1d] transition-all"
//           >
//             📜 Save Recipe
//           </button>

//           <div
//             ref={recipeRef}
//             className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 border border-gray-300"
//           >
//             {/* Recipe Title */}
//             <h1 className="text-3xl font-serif text-center font-bold mb-6 text-[#6b4226]">
//               {currentPost.title}
//             </h1>

//             {/* Recipe Description */}
//             <p className=" text-gray-600 text-center italic mb-6 text-base">
//               {currentPost.recipedescription}
//             </p>

//             {/* Yield & Time Info */}
//             <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//               <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//                 ⏳ Yield & Time
//               </h2>
//               <p className="text-base">
//                 <strong>Yield:</strong> {recipeDetails.yield}
//               </p>
//               <p className="text-base">
//                 <strong>Preparation Time:</strong>{" "}
//                 {recipeDetails.preparationTime}
//               </p>
//               <p className="text-base">
//                 <strong>Cook Time:</strong> {recipeDetails.cookTime}
//               </p>
//               <p className="text-base">
//                 <strong>Total Time:</strong> {recipeDetails.totalTime}
//               </p>
//             </div>

//             {/* Quantity Selector */}
//             <div className="flex justify-center space-x-3 mb-6">
//               {["1X", "2X", "3X", "4X"].map((qty) => (
//                 <button
//                   key={qty}
//                   onClick={() => {
//                     setSelectedQuantity(qty);
//                     setCheckedItems(
//                       new Array(recipeDetails.ingredients.length).fill(false)
//                     );
//                   }}
//                   className={`px-5 py-2 rounded-lg text-base font-semibold transition-all ${
//                     selectedQuantity === qty
//                       ? "bg-[#b5651d] text-white shadow-md"
//                       : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                   }`}
//                 >
//                   {qty}
//                 </button>
//               ))}
//             </div>

//             {/* Ingredients */}
//             {/* <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//             <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//               🍽 Ingredients
//             </h2>
//             <ul className="list-disc pl-5 space-y-2 text-lg">
//               {recipeDetails.ingredients.map((ingredient: any, index: any) => (
//                 <li key={index} className="text-gray-700 text-base">
//                   {ingredient.quantity} {ingredient.name}
//                 </li>
//               ))}
//             </ul>
//           </div> */}

//             <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//               <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//                 🍽 Ingredients
//               </h2>
//               <ul className="list-disc pl-5 space-y-2 text-lg">
//                 {recipeDetails.ingredients.map(
//                   (ingredient: any, index: any) => (
//                     <li
//                       key={index}
//                       className={`text-gray-700 text-base ${
//                         checkedItems[index] ? "line-through" : ""
//                       }`}
//                     >
//                       <label className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={checkedItems[index]}
//                           onChange={() => handleCheck(index)}
//                           className="h-4 w-4 text-[#b5651d] checked:bg-[#b5651d] border-[#b5651d] focus:ring-[#b5651d]"
//                         />
//                         <span>
//                           {ingredient.quantity} {ingredient.name}
//                         </span>
//                       </label>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>

//             {/* Instructions */}
//             <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//               <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//                 📖 Instructions
//               </h2>
//               <ol className="list-decimal pl-5 space-y-2 text-lg">
//                 {currentPost.instructions?.map(
//                   (instruction: any, index: any) => (
//                     <li key={index} className="text-gray-700 text-base">
//                       {instruction}
//                     </li>
//                   )
//                 )}
//               </ol>
//             </div>

//             {/* Notes */}
//             <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//               <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//                 📝 Notes
//               </h2>
//               <ul className="list-disc pl-5 space-y-2 text-lg">
//                 {recipeDetails.notes.map((note: any, index: any) => (
//                   <li key={index} className="text-gray-700 text-base">
//                     {note}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Nutrition Info */}
//             <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300">
//               <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//                 🍎 Nutrition
//               </h2>
//               <p className="text-base">
//                 <strong>Calories:</strong> {recipeDetails.nutrition.calories}
//               </p>
//               <p className="text-base">
//                 <strong>Protein:</strong> {recipeDetails.nutrition.protein}
//               </p>
//               <p className="text-base">
//                 <strong>Fat:</strong> {recipeDetails.nutrition.fat}
//               </p>
//               <p className="text-base">
//                 <strong>Carbohydrates:</strong>{" "}
//                 {recipeDetails.nutrition.carbohydrates}
//               </p>
//               <p className="text-base">
//                 <strong>Fiber:</strong> {recipeDetails.nutrition.fiber}
//               </p>
//               <p className="text-base">
//                 <strong>Calcium:</strong> {recipeDetails.nutrition.calcium}
//               </p>
//             </div>
//           </div>
//         </div>
//       );
//     }
//     loadModule();
//   }, []);

//   return Component;

//   // <div className="flex flex-col items-center min-h-screen px-4 py-4 w-full">
//   //   <button
//   //     onClick={downloadPDF}
//   //     className="mb-4 px-5 py-2 bg-[#b5651d] text-white font-serif rounded-full shadow-md hover:bg-[#8a4f1d] transition-all"
//   //   >
//   //     📜 Save Recipe
//   //   </button>

//   //   <div
//   //     ref={recipeRef}
//   //     className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 border border-gray-300"
//   //   >
//   //     {/* Recipe Title */}
//   //     <h1 className="text-3xl font-serif text-center font-bold mb-6 text-[#6b4226]">
//   //       {currentPost.title}
//   //     </h1>

//   //     {/* Yield & Time Info */}
//   //     <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//   //       <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//   //         ⏳ Yield & Time
//   //       </h2>
//   //       <p className="text-base">
//   //         <strong>Yield:</strong> {recipeDetails.yield}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Preparation Time:</strong> {recipeDetails.preparationTime}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Cook Time:</strong> {recipeDetails.cookTime}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Total Time:</strong> {recipeDetails.totalTime}
//   //       </p>
//   //     </div>

//   //     {/* Recipe Description */}
//   //     <p className=" text-gray-600 text-center italic mb-6 text-base">
//   //       {currentPost.recipedescription}
//   //     </p>

//   //     {/* Quantity Selector */}
//   //     <div className="flex justify-center space-x-3 mb-6">
//   //       {["1X", "2X", "3X", "4X"].map((qty) => (
//   //         <button
//   //           key={qty}
//   //           onClick={() => setSelectedQuantity(qty)}
//   //           className={`px-5 py-2 rounded-lg text-base font-semibold transition-all ${
//   //             selectedQuantity === qty
//   //               ? "bg-[#b5651d] text-white shadow-md"
//   //               : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//   //           }`}
//   //         >
//   //           {qty}
//   //         </button>
//   //       ))}
//   //     </div>

//   //     {/* Ingredients */}
//   //     <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//   //       <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//   //         🍽 Ingredients
//   //       </h2>
//   //       <ul className="list-disc pl-5 space-y-2 text-lg">
//   //         {recipeDetails.ingredients.map((ingredient: any, index: any) => (
//   //           <li key={index} className="text-gray-700 text-base">
//   //             {ingredient.quantity} {ingredient.name}
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </div>

//   //     {/* Instructions */}
//   //     <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//   //       <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//   //         📖 Instructions
//   //       </h2>
//   //       <ol className="list-decimal pl-5 space-y-2 text-lg">
//   //         {currentPost.instructions?.map((instruction: any, index: any) => (
//   //           <li key={index} className="text-gray-700 text-base">
//   //             {instruction}
//   //           </li>
//   //         ))}
//   //       </ol>
//   //     </div>

//   //     {/* Notes */}
//   //     <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//   //       <h2 className="text-xl font-serif text-[#6b4226] mb-3">📝 Notes</h2>
//   //       <ul className="list-disc pl-5 space-y-2 text-lg">
//   //         {recipeDetails.notes.map((note: any, index: any) => (
//   //           <li key={index} className="text-gray-700 text-base">
//   //             {note}
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </div>

//   //     {/* Nutrition Info */}
//   //     <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300">
//   //       <h2 className="text-xl font-serif text-[#6b4226] mb-3">
//   //         🍎 Nutrition
//   //       </h2>
//   //       <p className="text-base">
//   //         <strong>Calories:</strong> {recipeDetails.nutrition.calories}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Protein:</strong> {recipeDetails.nutrition.protein}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Fat:</strong> {recipeDetails.nutrition.fat}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Carbohydrates:</strong>{" "}
//   //         {recipeDetails.nutrition.carbohydrates}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Fiber:</strong> {recipeDetails.nutrition.fiber}
//   //       </p>
//   //       <p className="text-base">
//   //         <strong>Calcium:</strong> {recipeDetails.nutrition.calcium}
//   //       </p>
//   //     </div>
//   //   </div>
//   // </div>
// };

// export default RecipePage;

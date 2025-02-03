// "use client";
// import { useState } from "react";

// const RecipePage = ({ currentPost }: any) => {
//   const [selectedQuantity, setSelectedQuantity] = useState("1X");
//   // let selectedQuantity = "1X";
//   // Your existing code...
//   console.log(`currentPost`, currentPost);

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
//   return (
//     <div className="flex justify-center items-center min-h-screen   px-4 py-4 w-full xl:px-0">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4 border border-gray-300 relative">
//         {/* Recipe Title */}
//         <h1 className="text-3xl font-serif text-center font-bold mb-6 text-[#6b4226]">
//           {currentPost.title}
//         </h1>

//         {/* Yield & Time Info */}
//         <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//           <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
//             ⏳ Yield & Time
//           </h2>
//           <p className="text-lg">
//             <strong>Yield:</strong> {recipeDetails.yield}
//           </p>
//           <p className="text-lg">
//             <strong>Preparation Time:</strong> {recipeDetails.preparationTime}
//           </p>
//           <p className="text-lg">
//             <strong>Cook Time:</strong> {recipeDetails.cookTime}
//           </p>
//           <p className="text-lg">
//             <strong>Total Time:</strong> {recipeDetails.totalTime}
//           </p>
//         </div>

//         {/* Recipe Description */}
//         <p className="text-lg text-gray-600 text-center italic mb-6">
//           {currentPost.recipedescription}
//         </p>

//         {/* Quantity Selector (Styled as Tabs) */}
//         <div className="flex justify-center space-x-3 mb-6">
//           {["1X", "2X", "3X", "4X"].map((qty) => (
//             <button
//               key={qty}
//               onClick={() => setSelectedQuantity(qty)}
//               className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all ${
//                 selectedQuantity === qty
//                   ? "bg-[#b5651d] text-white shadow-md"
//                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               {qty}
//             </button>
//           ))}
//         </div>

//         {/* Ingredients */}
//         <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//           <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
//             🍽 Ingredients
//           </h2>
//           <ul className="list-disc pl-5 space-y-2 text-lg">
//             {recipeDetails.ingredients.map((ingredient: any, index: any) => (
//               <li key={index} className="text-gray-700">
//                 {ingredient.quantity} {ingredient.name}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Instructions */}
//         <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//           <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
//             📖 Instructions
//           </h2>
//           <ol className="list-decimal pl-5 space-y-2 text-lg">
//             {currentPost.instructions?.map((instruction: any, index: any) => (
//               <li key={index} className="text-gray-700">
//                 {instruction}
//               </li>
//             ))}
//           </ol>
//         </div>

//         {/* Notes */}
//         <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
//           <h2 className="text-2xl font-serif text-[#6b4226] mb-3">📝 Notes</h2>
//           <ul className="list-disc pl-5 space-y-2 text-lg">
//             {recipeDetails.notes.map((note: any, index: any) => (
//               <li key={index} className="text-gray-700">
//                 {note}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Nutrition Info */}
//         <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300">
//           <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
//             🍎 Nutrition
//           </h2>
//           <p className="text-lg">
//             <strong>Calories:</strong> {recipeDetails.nutrition.calories}
//           </p>
//           <p className="text-lg">
//             <strong>Protein:</strong> {recipeDetails.nutrition.protein}
//           </p>
//           <p className="text-lg">
//             <strong>Fat:</strong> {recipeDetails.nutrition.fat}
//           </p>
//           <p className="text-lg">
//             <strong>Carbohydrates:</strong>{" "}
//             {recipeDetails.nutrition.carbohydrates}
//           </p>
//           <p className="text-lg">
//             <strong>Fiber:</strong> {recipeDetails.nutrition.fiber}
//           </p>
//           <p className="text-lg">
//             <strong>Calcium:</strong> {recipeDetails.nutrition.calcium}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RecipePage = ({ currentPost }: any) => {
  const [selectedQuantity, setSelectedQuantity] = useState("1X");
  const recipeRef = useRef(null);

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

  const downloadPDF = async () => {
    const element = recipeRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${currentPost.title}.pdf`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-4 w-full">
      <button
        onClick={downloadPDF}
        className="mb-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
      >
        Download PDF
      </button>

      <div
        ref={recipeRef}
        className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-4 border border-gray-300"
      >
        {/* Recipe Title */}
        <h1 className="text-3xl font-serif text-center font-bold mb-6 text-[#6b4226]">
          {currentPost.title}
        </h1>

        {/* Yield & Time Info */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
            ⏳ Yield & Time
          </h2>
          <p className="text-lg">
            <strong>Yield:</strong> {recipeDetails.yield}
          </p>
          <p className="text-lg">
            <strong>Preparation Time:</strong> {recipeDetails.preparationTime}
          </p>
          <p className="text-lg">
            <strong>Cook Time:</strong> {recipeDetails.cookTime}
          </p>
          <p className="text-lg">
            <strong>Total Time:</strong> {recipeDetails.totalTime}
          </p>
        </div>

        {/* Recipe Description */}
        <p className="text-lg text-gray-600 text-center italic mb-6">
          {currentPost.recipedescription}
        </p>

        {/* Quantity Selector */}
        <div className="flex justify-center space-x-3 mb-6">
          {["1X", "2X", "3X", "4X"].map((qty) => (
            <button
              key={qty}
              onClick={() => setSelectedQuantity(qty)}
              className={`px-5 py-2 rounded-lg text-lg font-semibold transition-all ${
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
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
            🍽 Ingredients
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            {recipeDetails.ingredients.map((ingredient: any, index: any) => (
              <li key={index} className="text-gray-700">
                {ingredient.quantity} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
            📖 Instructions
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-lg">
            {currentPost.instructions?.map((instruction: any, index: any) => (
              <li key={index} className="text-gray-700">
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        {/* Notes */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300 mb-6">
          <h2 className="text-2xl font-serif text-[#6b4226] mb-3">📝 Notes</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg">
            {recipeDetails.notes.map((note: any, index: any) => (
              <li key={index} className="text-gray-700">
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* Nutrition Info */}
        <div className="bg-[#f9f5f0] p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-serif text-[#6b4226] mb-3">
            🍎 Nutrition
          </h2>
          <p className="text-lg">
            <strong>Calories:</strong> {recipeDetails.nutrition.calories}
          </p>
          <p className="text-lg">
            <strong>Protein:</strong> {recipeDetails.nutrition.protein}
          </p>
          <p className="text-lg">
            <strong>Fat:</strong> {recipeDetails.nutrition.fat}
          </p>
          <p className="text-lg">
            <strong>Carbohydrates:</strong>{" "}
            {recipeDetails.nutrition.carbohydrates}
          </p>
          <p className="text-lg">
            <strong>Fiber:</strong> {recipeDetails.nutrition.fiber}
          </p>
          <p className="text-lg">
            <strong>Calcium:</strong> {recipeDetails.nutrition.calcium}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;

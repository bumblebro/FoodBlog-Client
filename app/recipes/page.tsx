import localFont from "next/font/local";

import DeSlugify from "@/libs/DeSlugify";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Navbar3 from "@/components/navbar3/page";
import { Poppins } from "next/font/google";
// Poppins
const Poppins700 = Poppins({
  weight: "700",
  subsets: ["latin"],
  // display: "swap",
});

const Poppins400 = Poppins({
  weight: "400",
  subsets: ["latin"],
  // display: "swap",
});

const Poppins500 = Poppins({
  weight: "500",
  subsets: ["latin"],
  // display : "swap",
});
const freight = localFont({
  src: "../../app/fonts/freight-neo-pro-book.otf",
});

const CuisineTypes = [
  "Italian",
  "Mexican",
  "Asian",
  "Mediterranean",
  "American",
  "Indian",
  "French",
  "Japanese",
  "Greek",
  "Spanish",
];

const MealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Desserts",
  "Brunch",
];

const DietaryPreferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "Dairy-Free",
];

const CookingTechniques = [
  "Baking",
  "Grilling",
  "Roasting",
  "Sautéing",
  "Boiling",
  "Steaming",
  "Frying",
  "Smoking",
];
const Ingredients = [
  "Fruits",
  "Vegetables",
  "Proteins",
  "Grains",
  "Spices-and-Herbs",
];

const RecipeFormats = [
  "Quick-Meals",
  "Slow-Cooker",
  "Instant-Pot",
  "Batch-Cooking",
  "No-Cook",
  "One-Bowl-Meals",
  "Kid-Friendly",
];

const ModernTrends = [
  "Plant-Based",
  "Fusion-Cuisine",
  "Healthy-Swaps",
  "Fermented-Foods",
  "Zero-Waste-Cooking",
];

const SeasonalRecipes = ["Spring", "Summer", "Fall", "Winter", "Holiday"];

const GlobalFlavors = [
  "Middle-Eastern",
  "South-American",
  "African",
  "Caribbean",
  "Nordic",
];

const SpecialOccasions = [
  "Birthday",
  "Anniversary",
  "Picnic",
  "Potluck",
  "Game-Day",
];

function page() {
  return (
    <div>
      <Navbar3 />
      <div className=" w-full px-4 my-15 mb-10">
        <div
          className={`  w-full    tracking-wider 2xl:px-44 lg:pt-8 mx-auto  xl:max-w-[73rem] px-3"
  id="navbar-sticky    text-[#000000]`}
        >
          <h1
            className={`text-2xl md:text-3xl py-10 ${Poppins700.className} text-center`}
          >
            All Recipes
          </h1>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 ">
            <div>
              <Link
                href={"/cuisine-types"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Cuisine Types
              </Link>
              <ul className="font-light flex flex-col gap-3 pt-4 ">
                {CuisineTypes.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/cuisine-types/${item.toLowerCase()} `}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/meal-types"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Meal Types
              </Link>
              <ul className="font-light flex flex-col gap-3  pt-4">
                {MealTypes.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/meal-types/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/dietary-preferences"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Dietary Preferences
              </Link>
              <ul className="font-light flex flex-col gap-3   pt-4">
                {DietaryPreferences.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/dietary-preferences/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/cooking-techniques"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Cooking Techniques
              </Link>
              <ul className="font-light flex flex-col gap-3   pt-4">
                {CookingTechniques.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/cooking-techniques/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/ingredients"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Ingredients
              </Link>
              <ul className="font-light flex flex-col gap-3   pt-4">
                {Ingredients.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/ingredients/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/recipe-formats"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Recipe Formats
              </Link>
              <ul className="font-light flex flex-col gap-3  pt-4 ">
                {RecipeFormats.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/recipe-formats/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/modern-trends"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Modern Trends
              </Link>
              <ul className="font-light flex flex-col gap-3  pt-4 ">
                {ModernTrends.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/modern-trends/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/seasonal-recipes"}
                className={` hover:underline ${Poppins700.className}  text-lg`}
              >
                Seasonal Recipes
              </Link>
              <ul className="font-light flex flex-col gap-3  pt-4 ">
                {SeasonalRecipes.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/seasonal-recipes/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/global-flavors"}
                className={` hover:underline ${Poppins700.className}  text-lg`}
              >
                Global Flavors
              </Link>
              <ul className="font-light flex flex-col gap-3  pt-4 ">
                {GlobalFlavors.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/global-flavors/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href={"/special-occasions"}
                className={` hover:underline ${Poppins700.className} text-lg`}
              >
                Special Occasions
              </Link>
              <ul className="font-light flex flex-col gap-3   pt-4">
                {SpecialOccasions.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`/special-occasions/${item.toLowerCase()}`}
                      key={index}
                      className={`hover:underline ${Poppins400.className}`}
                    >
                      {DeSlugify(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* <Footer /> */}
    </div>
  );
}

export default page;

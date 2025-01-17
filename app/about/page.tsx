import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  alternates: {
    canonical: "/about",
  },
};

function page() {
  return (
    <div className="flex flex-col  gap-4 px-4 pb-3 my-[130px] md:my-[105px]   md:max-w-[45rem] mx-auto w-full leading-[1.7rem] font-[330] text-black ">
      <h1 className="text-center text-3xl font-semibold py-6">About Us</h1>
      <p>
        Welcome to SavoryTouch, your go-to destination for all things food and
        drink. Here, we celebrate the joys of culinary exploration, where every
        dish tells a story and every flavor brings an experience to life.
        Whether you&apos;re a passionate home cook, a curious foodie, or someone
        who just loves to savor the art of dining, you&apos;ve found the perfect
        place.
      </p>

      <p>
        At SavoryTouch, we believe that food is more than just
        nourishment&mdash; it&apos;s an adventure for the senses. Our mission is
        to inspire, inform, and share the love of food by providing a diverse
        range of recipes, cooking tips, and food culture insights. From easy
        weeknight dinners and gourmet meals to the latest trends in the culinary
        world, we have something for every taste.
      </p>

      <p>
        What sets SavoryTouch apart is our dedication to crafting content that
        speaks to both seasoned chefs and casual kitchen experimenters alike.
        Whether it&rsquo;s uncovering the secrets of traditional dishes or
        showcasing modern twists on classic flavors, our goal is to make cooking
        approachable, enjoyable, and delicious for everyone.
      </p>

      <p>
        SavoryTouch is more than just a blog&mdash;it&rsquo;s a community for
        those who find joy in sharing meals, discovering new flavors, and
        learning the stories behind the food. We invite you to dive into our
        collection of recipes, culinary stories, and expert tips, and join us in
        celebrating the art of eating well.
      </p>

      <p>
        Whether you&rsquo;re here to improve your cooking skills, get inspired
        for your next meal, or simply discover the best new places to eat and
        drink, SavoryTouch is your companion in the kitchen and beyond.
        We&apos;re constantly adding fresh, flavorful content that will inspire
        you to explore, create, and indulge in the richness of food and drink.
      </p>

      <p>
        Welcome to SavoryTouch&mdash;where every recipe is an adventure, and
        every meal is an opportunity to savor the moment. Let&apos;s cook, eat,
        and discover together.
      </p>
    </div>
  );
}

export default page;

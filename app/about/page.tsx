import { Metadata } from "next";
import { FacebookIcon, PinterestIcon } from "react-share";
import imgurl from "../../public/photo.jpg";
import Image from "next/image";

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
      <div className="container mx-auto px-4 py-12 text-left">
        <h1 className="text-3xl font-extrabold pb-6">About Savory Touch</h1>
        <p className="mb-4">By Team Savory Touch</p>
        <p className="mb-4">
          To our wonderful community of home cooks, food lovers, and culinary
          adventurers: Welcome to Savory Touch!
        </p>
        <p className="mb-4">
          We believe that food is more than just sustenance it&apos;s an
          experience, a story, and a passion. Our goal is simple:
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          ALL THE RECIPES YOU&apos;LL EVER NEED. PERIOD.
        </h2>
        <p className="mb-4">
          Savory Touch brings together a rich collection of flavorful recipes,
          creative cooking ideas, and an enthusiastic community that shares a
          love for great food. Here&apos;s what you can expect:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            Thousands of carefully curated recipes, with new dishes added
            regularly.
          </li>
          <li className="mb-2">
            A vibrant community where you can share your experiences, post
            reviews, and ask cooking-related questions.
          </li>
        </ul>
        <p className="mb-4">
          Whether you&apos;re a seasoned chef or just getting started in the
          kitchen, we&apos;re here to make cooking fun, easy, and delicious. If
          you&apos;re looking for inspiration, check out our{" "}
          <strong>Recipes Section</strong>, featuring everything from comforting
          classics to bold, innovative dishes.
        </p>
        <p className="mb-4">
          Got any questions or need assistance? Our support team is here to
          help. Reach out to us at{" "}
        </p>

        <ul>
          <li>
            📧 <strong>Email:</strong>{" "}
            <a rel="noopener" className="underline" href="mailto:savorytouch13@gmail.com">
              savorytouch13@gmail.com
            </a>
          </li>
          <li>
            📘 <strong>Facebook:</strong>{" "}
            <a
              rel="noopener"  className="underline"
              href="https://www.facebook.com/profile.php?id=61574819005948"
              target="_blank"
            >
              facebook.com/profile.php?id=61574819005948
            </a>
          </li>
          <li>
            📌 <strong>Pinterest:</strong>{" "}
            <a
              rel="noopener" className="underline"
              href="https://in.pinterest.com/SavoryTouchBlog/"
              target="_blank"
            >
              in.pinterest.com/SavoryTouchBlog/
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Meet the Admin</h2>

        <Image
          src={imgurl}
          alt="Shreyas M S - Admin of Savory Touch"
          width="200"
          height="200"
          className="my-4"
        />

        {/* Admin Image */}
        <div className="flex items-center gap-4">
          <div>
            <p className="mb-4">
              <strong>Shreyas M S</strong> - Founder & Admin of Savory Touch
            </p>
            <p className="mb-4">
              Hi, I&apos;m Shreyas, the creator of Savory Touch! As a passionate
              foodie and tech enthusiast, I built this platform to share amazing
              recipes with the world. My goal is to bring together a community
              that loves cooking and experimenting with flavors. Whether you&apos;re
              looking for easy meal ideas or gourmet delights, I&apos;ve got you
              covered!
            </p>
            <p className="mb-4">
              Want to connect? Feel free to reach out via{" "}
              <a href="mailto:shreyasms660@gmail.com" className="underline">
                Email
              </a>
              .
            </p>
            <p className="mb-4">
              🔗 <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/shreyasms660/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                linkedin.com/in/shreyasms660/
              </a>
            </p>
          </div>
        </div>

        <p className="mb-4">Happy cooking,</p>
        <p className="font-semibold">Team Savory Touch</p>
      </div>
    </div>
  );
}

export default page;

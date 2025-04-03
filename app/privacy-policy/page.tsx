import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}`),
  alternates: {
    canonical: "/privacy-policy",
  },
};

function page() {
  return (
    <div className="flex flex-col  gap-4 px-4 pb-3 my-[130px] md:my-[105px]   md:max-w-[45rem] mx-auto w-full leading-[1.7rem] font-[330] text-black ">
    <div>
  
    
      <h1 className="text-3xl font-extrabold pb-6">
        Privacy Policy for SavoryTouch
      </h1>
      <h1>SavoryTouch Privacy Policy</h1>
      <h2>Effective Date: April 1st, 2024</h2>
      <div className="container mx-auto py-12 text-left">
        <p className="mb-4">
          Welcome to SavoryTouch (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;). This privacy policy outlines
          our practices regarding the collection, use, and disclosure of your
          information when you visit our website. We take your privacy seriously
          and are committed to protecting it.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          1. Information Collection and Use
        </h2>
        <p className="mb-4">We collect two types of information from you:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>a. Personal Information:</strong> This includes any
            information that can be used to identify you, such as your name,
            email address, and phone number. We collect personal information
            when you sign up for our newsletter, contact us through our contact
            form, or participate in promotions or surveys on our website.
          </li>
          <li className="mb-2">
            <strong>b. Non-Personal Information:</strong> This includes
            information about your device, browser, and usage patterns on our
            website. We use cookies and similar tracking technologies to collect
            non-personal information to help us improve your user experience.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">We use your personal information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>
              a. Respond to your inquiries and provide customer support.
            </strong>
          </li>
          <li className="mb-2">
            <strong>
            b. Send you newsletters, promotional materials, or other
            information you have requested. If you wish to opt out of receiving promotional emails, you can do so by contacting us.
            </strong>
          </li>
          <li className="mb-2">
            <strong>
              c. Improve our website and tailor content to your interests.
            </strong>
          </li>
        </ul>
        <p className="mb-4">We use your non-personal information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">
            <strong>
              a. Analyze website usage and trends to improve our services.
            </strong>
          </li>
          <li className="mb-2">
            <strong>
              b. Identify and resolve technical issues on our website.
            </strong>
          </li>
          <li className="mb-2">
            <strong>c. Enhance the security of our website.</strong>
          </li>
        </ul>
        <p className="mb-4">
          We use Google Analytics to track non-personally identifiable data
          about the usage of the site. Please see the&nbsp;
          <a
            href="https://policies.google.com/privacy"
            rel="nofollow"
            className="underline"
          >
            Google Analytics Privacy Policy
          </a>&nbsp;
          for more details.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          3. Information Sharing and Disclosure
        </h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We
          may share your information with third-party service providers, such as
          email providers and website analytics providers, to help us operate
          our website and deliver our services. These third parties are required
          to maintain the confidentiality of your information and may not use it
          for any other purpose.
        </p>
        <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
        <p className="mb-4">
          We are committed to protecting your personal information from
          unauthorized access, use, or disclosure. We use reasonable security
          measures to help protect your information, but please note that no
          method of transmission over the internet or electronic storage is 100%
          secure.
        </p>
        <h2 className="text-2xl font-semibold mb-4">5. Children&apos;s Privacy</h2>
        <p className="mb-4">
        Our website is not intended for children under the age of 18. We do
          not knowingly collect or maintain information from children under 18.
          If you become aware that a child has provided us with personal
          information, please contact us, and we will take steps to delete such
          information.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          6. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our privacy policy from time to time. We will notify you
          of any changes by posting the new privacy policy on this page. Your
          continued use of our website after we post any modifications
          constitutes your acknowledgment of the modified policy and your
          agreement to abide by it.
        </p>
        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about our privacy policy, please&nbsp;
          <a href="/contact-us">contact us</a>
        </p>
      </div>
    </div>


    </div>
  );
}

export default page;

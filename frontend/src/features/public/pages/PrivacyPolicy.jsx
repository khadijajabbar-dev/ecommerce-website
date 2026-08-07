import { PublicNavbar, PublicFooter } from "../../../shared/components";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Privacy Policy
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Your data is safe with us
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Learn how we collect, use, and protect your personal information.
          </div>
          
      <div className="space-y-6 text-body leading-relaxed text-sm">
        <h2 className="text-xl font-bold text-heading">Data Collection</h2>
        <p>
          We collect information that you provide directly to us when you create an account, make a purchase, or contact customer support. This may include your name, email address, phone number, shipping address, and payment information.
        </p>
        <p>
          We also automatically collect certain technical information when you visit our site, such as your IP address, browser type, and device information.
        </p>

        <h2 className="text-xl font-bold text-heading">How We Use Your Data</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about products, services, and promotions</li>
          <li>Improve and optimize our website and user experience</li>
          <li>Detect and prevent fraud and abuse</li>
        </ul>

        <h2 className="text-xl font-bold text-heading">Information Sharing</h2>
        <p>
          We do not sell your personal information to third parties. We may share your data with trusted service providers who help us operate our business (such as payment processors and shipping carriers), but only to the extent necessary to provide their services.
        </p>

        <h2 className="text-xl font-bold text-heading">Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-xl font-bold text-heading">Your Rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct, or delete your personal data. You can manage your account information through your profile settings or by contacting our privacy team.
        </p>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default PrivacyPolicy;

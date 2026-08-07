import { PublicNavbar, PublicFooter } from "../../../shared/components";

const TermsConditions = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Terms & Conditions
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Platform usage rules
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Please read our terms and conditions carefully before using our marketplace.
          </div>
          
      <div className="space-y-6 text-body leading-relaxed text-sm">
        <h2 className="text-xl font-bold text-heading">1. Introduction</h2>
        <p>
          Welcome to Easy Mart. These Terms and Conditions govern your use of our website and marketplace services. By accessing or using Easy Mart, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-xl font-bold text-heading">2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
        </p>

        <h2 className="text-xl font-bold text-heading">3. Buying and Selling</h2>
        <p>
          Easy Mart provides a platform for independent sellers to list and sell their products. We are not a party to the transactions between buyers and sellers. We do not guarantee the quality, safety, or legality of the items advertised, or the truth or accuracy of listings.
        </p>

        <h2 className="text-xl font-bold text-heading">4. Intellectual Property</h2>
        <p>
          The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Easy Mart and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.
        </p>

        <h2 className="text-xl font-bold text-heading">5. Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default TermsConditions;

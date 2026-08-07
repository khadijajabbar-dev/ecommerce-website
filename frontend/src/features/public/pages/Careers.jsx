import { PublicNavbar, PublicFooter } from "../../../shared/components";

const Careers = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Careers
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              Join the Easy Mart team
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Explore our open positions and find out how you can make a difference in the e-commerce world.
          </div>
          
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-heading mb-4">Why Work With Us?</h2>
          <p className="text-body leading-relaxed mb-4">
            At Easy Mart, we are building the future of e-commerce. We believe in innovation, collaboration, and creating tools that empower thousands of sellers and buyers worldwide. Our team is passionate, diverse, and driven by a shared mission to make online shopping seamless and reliable.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-body">
            <li>Flexible remote work options</li>
            <li>Comprehensive health and wellness benefits</li>
            <li>Continuous learning and development opportunities</li>
            <li>Competitive salary and equity packages</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-heading mb-4">Open Positions</h2>
          <div className="rounded-xl border border-border-main p-6 bg-white hover:border-primary transition cursor-pointer mb-4">
            <h3 className="text-xl font-semibold text-primary">Senior Frontend Engineer</h3>
            <p className="text-sm text-muted mt-1">Remote • Full-Time</p>
            <p className="mt-3 text-body text-sm">Help us build blazing-fast interfaces using React and Tailwind CSS.</p>
          </div>
          <div className="rounded-xl border border-border-main p-6 bg-white hover:border-primary transition cursor-pointer mb-4">
            <h3 className="text-xl font-semibold text-primary">Product Marketing Manager</h3>
            <p className="text-sm text-muted mt-1">New York / Remote • Full-Time</p>
            <p className="mt-3 text-body text-sm">Drive growth and seller acquisition through creative marketing campaigns.</p>
          </div>
          <p className="text-sm text-muted mt-6">Don't see a perfect fit? Send your resume to <strong>careers@easymart.com</strong>.</p>
        </div>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default Careers;

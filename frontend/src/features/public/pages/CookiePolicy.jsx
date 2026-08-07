import { PublicNavbar, PublicFooter } from "../../../shared/components";

const CookiePolicy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <PublicNavbar />
      
      <main className="flex-1">
        <section className="bg-primary pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-xl bg-card px-4 py-2 text-sm font-extrabold text-primary shadow-sm">
              Cookie Policy
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-normal text-white sm:text-5xl">
              How we use cookies
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 text-xl font-medium text-heading">
            Find out how we use cookies to improve your browsing experience on our platform.
          </div>
          
      <div className="space-y-6 text-body leading-relaxed text-sm">
        <h2 className="text-xl font-bold text-heading">What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
        </p>

        <h2 className="text-xl font-bold text-heading">How We Use Cookies</h2>
        <p>Easy Mart uses cookies for several purposes:</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Essential Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website or use a shopping cart.</li>
          <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.</li>
          <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (for example, your choice of language or region).</li>
          <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
        </ul>

        <h2 className="text-xl font-bold text-heading">Managing Cookies</h2>
        <p>
          Most web browsers allow some control of most cookies through the browser settings. You can block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.
        </p>
      </div>
    
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default CookiePolicy;

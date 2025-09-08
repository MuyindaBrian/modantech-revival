import { useState } from "react";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card/60 backdrop-blur p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Subscribe to our newsletter</h2>
          <p className="text-muted-foreground mb-6">Weekly insights on web, mobile, and SEO—no spam.</p>
          {submitted ? (
            <div className="text-green-600">Thanks! Please check your inbox to confirm your subscription.</div>
          ) : (
          <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={() => setSubmitted(true)} className="flex flex-col gap-3">
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden">
              <label>
                Don’t fill this out if you’re human: <input name="bot-field" />
              </label>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="rounded-md bg-primary text-white px-6 py-3 hover:bg-primary/90 transition-colors">Subscribe</button>
            </div>
            <label className="flex items-start gap-2 text-sm text-muted-foreground mt-2 text-left mx-auto max-w-xl">
              <input type="checkbox" name="consent" required className="mt-1" />
              I agree to receive the ModanTech weekly newsletter and accept the Privacy Policy.
            </label>
          </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;



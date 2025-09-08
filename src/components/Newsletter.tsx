const Newsletter = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-card/60 backdrop-blur p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Subscribe to our newsletter</h2>
          <p className="text-muted-foreground mb-6">Weekly insights on web, mobile, and SEO—no spam.</p>
          <form name="newsletter" method="POST" data-netlify="true" className="flex flex-col sm:flex-row gap-3 justify-center">
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 rounded-md border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="rounded-md bg-primary text-white px-6 py-3 hover:bg-primary/90 transition-colors">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;



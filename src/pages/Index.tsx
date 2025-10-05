import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home"
        description="ModanTech - Leading technology solutions provider in Uganda. We specialize in web development, mobile apps, cloud solutions, and digital transformation."
        url="/"
      />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <BlogSection />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

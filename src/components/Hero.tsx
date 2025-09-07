import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            Web & Mobile Development • Data Analysis
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
            Building Digital <span className="gradient-text">Excellence</span> for Your Business
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            We deliver robust products with clean UX, performance, and measurable impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button variant="hero" size="lg" className="group px-7 py-4 text-base" asChild>
              <Link to="/contact">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" className="group px-7 py-4 text-base" asChild>
              <Link to="/services">
                <Play className="mr-2 h-5 w-5" />
                Explore Services
              </Link>
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl mx-auto">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "100+", label: "Happy Clients" },
              { number: "30+", label: "Projects Completed" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border hover:bg-card transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1.5">
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-24 left-10 w-16 h-16 bg-primary/15 rounded-full blur-xl"></div>
      <div className="absolute bottom-24 right-10 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary/15 rounded-full blur-xl"></div>
    </section>
  );
};

export default Hero;
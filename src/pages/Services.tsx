import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Our Services
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Comprehensive Digital Solutions for Modern Businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We deliver tailored solutions to help businesses navigate the digital landscape with confidence and innovation.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Web Development */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 p-8 hover:shadow-glow transition-all duration-300">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Web Development</h3>
                  <p className="text-muted-foreground mb-6">
                    We create responsive, intuitive websites and web applications that engage your audience and drive business growth.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Custom Web Applications",
                      "Responsive Design", 
                      "E-commerce Solutions",
                      "CMS Integration"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Mobile App Development */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 p-8 hover:shadow-glow transition-all duration-300">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Mobile App Development</h3>
                  <p className="text-muted-foreground mb-6">
                    Transform your ideas into powerful mobile experiences with our native and cross-platform app development services.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "iOS & Android Apps",
                      "Cross-platform Solutions",
                      "UI/UX Design",
                      "App Maintenance"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Data Analysis */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 p-8 hover:shadow-glow transition-all duration-300">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Data Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Unlock the potential of your data with our advanced analytics services, providing actionable insights for informed decisions.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Business Intelligence",
                      "Data Visualization",
                      "Predictive Analytics",
                      "Real-time Dashboards"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
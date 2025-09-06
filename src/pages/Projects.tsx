import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web",
      description: "A full-featured e-commerce platform with inventory management, payment processing, and customer analytics.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop",
      tags: ["Web"]
    },
    {
      id: 2,
      title: "Health & Fitness App",
      category: "Mobile",
      description: "An iOS and Android app for tracking fitness activities, nutrition, and health metrics with personalized insights.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop",
      tags: ["Mobile"]
    },
    {
      id: 3,
      title: "Sales Performance Dashboard",
      category: "Data Analysis",
      description: "Interactive data visualization dashboard for monitoring sales KPIs, trends, and performance metrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
      tags: ["Data Analysis"]
    },
    {
      id: 4,
      title: "Real Estate Platform",
      category: "Web",
      description: "A comprehensive real estate platform with property listings, virtual tours, and mortgage calculator.",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2940&auto=format&fit=crop",
      tags: ["Web"]
    },
    {
      id: 5,
      title: "Food Delivery App",
      category: "Mobile",
      description: "A cross-platform mobile app for food ordering and delivery with real-time tracking and payment processing.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2940&auto=format&fit=crop",
      tags: ["Mobile"]
    },
    {
      id: 6,
      title: "Customer Behavior Analysis",
      category: "Data Analysis", 
      description: "Data-driven analysis of customer behavior patterns to inform marketing strategies and product development.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2940&auto=format&fit=crop",
      tags: ["Data Analysis"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Our Work
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore our portfolio of successful projects delivered for clients across various industries.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group/btn hover:bg-primary hover:text-primary-foreground"
                    >
                      View Project
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
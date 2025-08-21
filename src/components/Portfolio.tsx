import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web",
      description: "A full-featured e-commerce platform with inventory management, payment processing, and customer analytics.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340&auto=format&fit=crop",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Health & Fitness App",
      category: "Mobile",
      description: "An iOS and Android app for tracking fitness activities, nutrition, and health metrics with personalized insights.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2340&auto=format&fit=crop",
      tags: ["React Native", "Firebase", "Charts"],
    },
    {
      id: 3,
      title: "Sales Performance Dashboard",
      category: "Data Analysis",
      description: "Interactive data visualization dashboard for monitoring sales KPIs, trends, and performance metrics.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
      tags: ["Python", "D3.js", "PostgreSQL"],
    },
    {
      id: 4,
      title: "Real Estate Platform",
      category: "Web",
      description: "A comprehensive real estate platform with property listings, virtual tours, and mortgage calculator.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2340&auto=format&fit=crop",
      tags: ["Vue.js", "Laravel", "MySQL"],
    },
    {
      id: 5,
      title: "Food Delivery App",
      category: "Mobile",
      description: "A cross-platform mobile app for food ordering and delivery with real-time tracking and payment processing.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=2340&auto=format&fit=crop",
      tags: ["Flutter", "Express", "Socket.io"],
    },
    {
      id: 6,
      title: "Customer Behavior Analysis",
      category: "Data Analysis",
      description: "Data-driven analysis of customer behavior patterns to inform marketing strategies and product development.",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2340&auto=format&fit=crop",
      tags: ["R", "Tableau", "AWS"],
    },
  ];

  const filters = ["All", "Web", "Mobile", "Data Analysis"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Featured Projects
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful projects delivered for clients across various industries.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "hero" : "ghost"}
              onClick={() => setActiveFilter(filter)}
              className="px-6 py-2"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="group overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="glass" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Project
                  </Button>
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 bg-primary/90 text-white"
                >
                  {project.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
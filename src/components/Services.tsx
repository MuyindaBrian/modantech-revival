import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Smartphone, BarChart3, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: "Web Development",
      description: "We create responsive, intuitive websites and web applications that engage your audience and drive business growth.",
      features: [
        "Custom Web Applications",
        "Responsive Design",
        "E-commerce Solutions",
        "CMS Integration"
      ]
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Transform your ideas into powerful mobile experiences with our native and cross-platform app development services.",
      features: [
        "iOS & Android Apps",
        "Cross-platform Solutions",
        "UI/UX Design",
        "App Maintenance"
      ]
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Unlock the potential of your data with our advanced analytics services, providing actionable insights for informed decisions.",
      features: [
        "Business Intelligence",
        "Data Visualization",
        "Predictive Analytics",
        "Real-time Dashboards"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive Digital Solutions for Modern Businesses
          </p>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            We deliver tailored solutions to help businesses navigate the digital landscape with confidence and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
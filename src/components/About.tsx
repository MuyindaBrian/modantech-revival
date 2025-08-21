import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [progress, setProgress] = useState({
    web: 0,
    mobile: 0,
    data: 0,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress({
          web: 95,
          mobile: 90,
          data: 85,
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const skills = [
    { name: "Web Development", value: progress.web, color: "bg-primary" },
    { name: "Mobile Development", value: progress.mobile, color: "bg-primary" },
    { name: "Data Analysis", value: progress.data, color: "bg-primary" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="gradient-text">Us</span>
              </h2>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">
                We Create Digital Experiences That Matter
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                ModanTech is a premier digital solutions company specializing in web development, 
                mobile app creation, and data analysis. We combine technical expertise with creative 
                innovation to deliver solutions that drive real business results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of experienced developers, designers, and data scientists work collaboratively 
                to build digital products that are not only visually stunning but also functionally 
                powerful and user-friendly.
              </p>
            </div>

            {/* Skills Progress */}
            <div ref={ref} className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.value}%</span>
                  </div>
                  <Progress 
                    value={skill.value} 
                    className="h-3"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Company Info Card */}
          <div className="space-y-6">
            <Card className="bg-gradient-primary text-white p-8 shadow-glow">
              <CardContent className="p-0">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">ModanTech</h3>
                  <p className="text-white/90 mb-8">Building digital excellence since 2022</p>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">3+</div>
                      <div className="text-sm text-white/80">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">100+</div>
                      <div className="text-sm text-white/80">Happy Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">30+</div>
                      <div className="text-sm text-white/80">Projects Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-sm text-white/80">Support Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center hover:shadow-soft transition-shadow duration-300">
                <div className="text-2xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </Card>
              <Card className="p-6 text-center hover:shadow-soft transition-shadow duration-300">
                <div className="text-2xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
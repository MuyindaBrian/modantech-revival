import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Progress } from "@/components/ui/progress";

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              We Create Digital Experiences That Matter
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              ModanTech is a premier digital solutions company specializing in web development, mobile app creation, and data analysis. We combine technical expertise with creative innovation to deliver solutions that drive real business results.
            </p>
          </div>
        </section>

        {/* Company Description */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              Our team of experienced developers, designers, and data scientists work collaboratively to build digital products that are not only visually stunning but also functionally powerful and user-friendly.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-foreground mb-12">Our Expertise</h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Web Development</span>
                  <span className="text-primary font-bold">95%</span>
                </div>
                <Progress value={95} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Mobile Development</span>
                  <span className="text-primary font-bold">90%</span>
                </div>
                <Progress value={90} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Data Analysis</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">ModanTech</h3>
              <p className="text-lg text-muted-foreground">Building digital excellence since 2022</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  3+
                </div>
                <p className="text-muted-foreground font-medium">Years Experience</p>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <p className="text-muted-foreground font-medium">Happy Clients</p>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  30+
                </div>
                <p className="text-muted-foreground font-medium">Projects Completed</p>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <p className="text-muted-foreground font-medium">Support Available</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
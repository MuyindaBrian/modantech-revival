const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="text-xl font-bold">
              Modan<span className="text-primary">Tech</span>
            </span>
          </div>
          <p className="text-background/80 mb-6">
            Building digital excellence since 2022
          </p>
          <div className="border-t border-background/20 pt-6">
            <p className="text-background/60 text-sm">
              © 2024 ModanTech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
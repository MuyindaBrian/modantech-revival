import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 items-center">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="text-xl font-bold">
              Modan<span className="text-primary">Tech</span>
            </span>
          </div>

          <nav className="text-center">
            <ul className="inline-flex flex-wrap items-center gap-4 text-sm text-background/80">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><a href="/rss.xml" className="hover:text-white transition-colors">RSS</a></li>
              <li><a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </nav>

          <div className="text-center md:text-right text-background/60 text-sm">
            © {new Date().getFullYear()} ModanTech. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
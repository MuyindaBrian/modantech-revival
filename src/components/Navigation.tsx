import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import useAuth from "@/hooks/useAuth";

function SignOutButton({ onAfterClick }: { onAfterClick?: () => void }) {
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      onAfterClick?.();
      window.location.href = "/";
    } catch {
      onAfterClick?.();
    }
  };
  return (
    <Button variant="secondary" className="flex-1 md:flex-none px-4" onClick={handleLogout}>
      Logout
    </Button>
  );
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <picture>
              <source srcSet="/images/brand/logo-dark.svg" media="(prefers-color-scheme: dark)" />
              <img src="/images/brand/logo-light.svg" alt="ModanTech" className="h-8 w-auto" />
            </picture>
            <span className="text-lg font-semibold tracking-tight">ModanTech</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2">
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] bg-background border border-border shadow-lg z-50">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/10 p-6 no-underline outline-none focus:shadow-md hover:bg-primary/5 transition-colors"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-foreground">
                              All Services
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Comprehensive digital solutions for modern businesses
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-1">
                        <NavigationMenuLink asChild>
                          <Link to="/services#web-development" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Web Development</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Custom websites and web applications
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/services#mobile-apps" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Mobile Apps</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              iOS and Android application development
                            </p>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to="/services#data-analysis" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Data Analysis</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Business intelligence and analytics
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/team" className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2">
                    Team
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/projects" className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2">
                    Projects
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog" className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2">
                    Blog
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {!loading && isLoggedIn ? (
              <>
                <Button variant="outline" className="px-4" asChild>
                  <Link to="/admin">CMS / Admin</Link>
                </Button>
                <SignOutButton />
              </>
            ) : (
              <>
                <Button variant="outline" className="px-4" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button variant="hero" className="px-6" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {!loading && isLoggedIn ? (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>CMS / Admin</Link>
                </Button>
                <SignOutButton onAfterClick={() => setIsOpen(false)} />
              </div>
            ) : (
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
                </Button>
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
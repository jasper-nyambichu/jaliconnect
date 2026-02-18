import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/Heart-shaped_connection_logo_design-removebg-preview.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card-heavy">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-0 group">
          <img src={logo} alt="JaliConnect" className="h-32 w-24 object-contain align-middle align-center m-01 pt-5 " />
           <span className="font-display text-lg font-bold text-foreground pl-0">Jali<span className="text-gradient-teal">Connect</span></span> 
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#resources" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Resources</a>
            <a href="#programs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Programs</a>
            <a href="#stories" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Stories</a>
            <Link to="/counselor" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Counselors</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth" className="hidden sm:block">
              <Button variant="outline" className="rounded-full px-5 text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-teal text-accent-foreground font-semibold hover:bg-accent/90 rounded-full px-5 text-sm">
                Get Help
              </Button>
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="lg:hidden pb-6 space-y-3">
            {[
              { label: "Features", href: "#features" },
              { label: "About", href: "#about" },
              { label: "Resources", href: "#resources" },
              { label: "Programs", href: "#programs" },
              { label: "Stories", href: "#stories" },
            ].map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
            <Link to="/counselor" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Counselors
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

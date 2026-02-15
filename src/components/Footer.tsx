import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/ChatGPT_Image_Feb_15__2026__09_08_45_AM-removebg-preview.png";

const Footer = () => {
  return (
    <footer id="contact" className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="JaliConnect" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg font-bold text-foreground">
                Jali<span className="text-accent">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Caring Minds, Connecting Lives. Anonymous mental wellness support designed for young people.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#programs" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Programs</a>
              <Link to="/auth" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Sign In</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Crisis Support</h4>
            <div className="space-y-2">
              <a href="tel:988" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-3 h-3" /> Suicide & Crisis Lifeline: 988
              </a>
              <a href="sms:741741" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Crisis Text Line: Text HOME to 741741
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} JaliConnect. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

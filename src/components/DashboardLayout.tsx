import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, MessageCircle, User, Settings, LogOut, Menu, X, Bell, Search, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/ChatGPT_Image_Feb_15__2026__09_08_45_AM-removebg-preview.png';

const navItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { title: 'Book Session', icon: Calendar, path: '/book' },
  { title: 'Messages', icon: MessageCircle, path: '/messages', badge: 3 },
  { title: 'My Profile', icon: User, path: '/profile' },
  { title: 'Settings', icon: Settings, path: '/settings' },
  { title: 'Counselor Dashboard', icon: LayoutDashboard, path: '/counselor' },
  { title: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <>
      <div className={cn("flex items-center gap-2.5 px-4 py-6", !sidebarOpen && "justify-center px-2")}>
        <img src={logo} alt="JaliConnect" className="h-15 w-18  object-contain shrink-0" />
        {/* {sidebarOpen && <span className="font-display text-lg font-bold text-foreground">Jali<span className="text-accent">Connect</span></span>}  */}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive(item.path)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              !sidebarOpen && "justify-center px-2"
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0", isActive(item.path) && "text-primary")} />
            {sidebarOpen && <span>{item.title}</span>}
            {sidebarOpen && item.badge && (
              <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-semibold">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {sidebarOpen && (
        <div className="mx-3 mb-4 p-4 rounded-2xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Crisis?</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">If you're in immediate danger, please reach out.</p>
          <a href="tel:988" className="block text-center py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Call 988 Lifeline
          </a>
        </div>
      )}

      <div className="border-t border-border px-3 py-4">
        <Link to="/" className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all w-full", !sidebarOpen && "justify-center")}>
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Sign Out</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={cn(
        "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 shrink-0",
        sidebarOpen ? "w-64" : "w-[70px]"
      )}>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-16 border-b border-border glass-card-heavy flex items-center px-4 md:px-6 gap-4">
          <button onClick={() => { if (window.innerWidth < 768) setMobileOpen(true); else setSidebarOpen(!sidebarOpen); }} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

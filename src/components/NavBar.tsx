
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gauge, BarChart2, BookOpen, Settings, Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-semibold text-xl tracking-tight text-primary">TradeLogAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavItem to="/dashboard" icon={<Gauge size={18} />} label="Dashboard" />
          <NavItem to="/journal" icon={<BookOpen size={18} />} label="Journal" />
          <NavItem to="/analytics" icon={<BarChart2 size={18} />} label="Analytics" />
          <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
          <Button className="ml-4">Connect Broker</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-foreground" />
          ) : (
            <Menu size={24} className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-in">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <MobileNavItem to="/dashboard" icon={<Gauge size={18} />} label="Dashboard" onClick={toggleMobileMenu} />
            <MobileNavItem to="/journal" icon={<BookOpen size={18} />} label="Journal" onClick={toggleMobileMenu} />
            <MobileNavItem to="/analytics" icon={<BarChart2 size={18} />} label="Analytics" onClick={toggleMobileMenu} />
            <MobileNavItem to="/settings" icon={<Settings size={18} />} label="Settings" onClick={toggleMobileMenu} />
            <div className="pt-2 pb-3">
              <Button className="w-full">Connect Broker</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-primary/10 flex items-center space-x-1 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface MobileNavItemProps extends NavItemProps {
  onClick: () => void;
}

const MobileNavItem = ({ to, icon, label, onClick }: MobileNavItemProps) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/10 flex items-center space-x-2 transition-colors"
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default NavBar;

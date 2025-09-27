import { X, Settings, HelpCircle, Phone, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
  { icon: Phone, label: "Contact Us", href: "#" },
  { icon: Star, label: "Rate App", href: "#" },
  { icon: Shield, label: "Privacy Policy", href: "#" },
];

export const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 max-w-[90vw] glass-dark z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-white">
              <h2 className="text-2xl font-bold text-gradient-nature">Krishi</h2>
              <p className="text-sm text-white/70">Agricultural Companion</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg text-white/90 hover:bg-white/10 transition-colors nav-item"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          
          <div className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-2">App Version</h3>
            <p className="text-white/70 text-sm">Krishi v2.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
};
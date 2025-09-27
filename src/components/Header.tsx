import { Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuToggle: () => void;
  onProfileToggle: () => void;
}

export const Header = ({ onMenuToggle, onProfileToggle }: HeaderProps) => {
  return (
    <header className="glass sticky top-0 z-50 px-4 py-3 border-b">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuToggle}
          className="nav-item"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crops, weather, prices..."
              className="pl-10 bg-white/50 border-white/20 focus:bg-white/80 transition-colors"
            />
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onProfileToggle}
          className="nav-item"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
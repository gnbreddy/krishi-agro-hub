import { Home, TrendingUp, Calendar, Calculator, Briefcase, Bot } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Prices",
    icon: TrendingUp,
    path: "/price-prediction",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    path: "/jobs",
  },
  {
    label: "AI Chat",
    icon: Bot,
    path: "/ai-chat",
  },
  {
    label: "Calendar",
    icon: Calendar,
    path: "/crop-calendar",
  },
  {
    label: "Calculator",
    icon: Calculator,
    path: "/fertilizer-calculator",
  },
];

export const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t z-40">
      <div className="grid grid-cols-6 max-w-7xl mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center py-2 px-3 text-xs transition-all duration-200",
                "hover:bg-primary/10 active:scale-95",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-primary"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  className={cn(
                    "h-5 w-5 mb-1 transition-transform",
                    isActive && "scale-110"
                  )} 
                />
                <span className={cn(
                  "font-medium transition-colors",
                  isActive && "text-primary"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";
import { SideMenu } from "./SideMenu";
import { ProfileModal } from "./ProfileModal";
import { useState } from "react";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        onMenuToggle={() => setIsMenuOpen(true)}
        onProfileToggle={() => setIsProfileOpen(true)}
      />
      
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      
      <BottomNavigation />
      
      <SideMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};
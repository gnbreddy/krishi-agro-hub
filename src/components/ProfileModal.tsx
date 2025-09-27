import { X, User, Edit, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
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
      
      {/* Modal */}
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] glass z-50 rounded-xl transition-all duration-300",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Profile</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder-avatar.png" />
              <AvatarFallback className="text-lg bg-primary text-white">
                RK
              </AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">Rajesh Kumar</h3>
            <p className="text-muted-foreground">Farmer • Punjab, India</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 text-destructive border-destructive hover:bg-destructive hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
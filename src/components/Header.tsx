
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, User, Home, Calendar, Settings, LogOut, PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">StayFinder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Explore
            </button>
            {profile?.is_host && (
              <button
                onClick={() => navigate('/host')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Host Dashboard</span>
              </button>
            )}
            {user && (
              <button
                onClick={() => navigate('/bookings')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
              >
                <Calendar className="h-4 w-4" />
                <span>My Bookings</span>
              </button>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Log in
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  Sign up
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                {profile?.is_host && (
                  <Badge variant="secondary">Host</Badge>
                )}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/profile')}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>{profile?.full_name || user.email?.split('@')[0]}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={() => navigate('/')}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left"
                  >
                    Explore
                  </button>
                  
                  {user ? (
                    <>
                      <button
                        onClick={() => navigate('/bookings')}
                        className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left flex items-center space-x-2"
                      >
                        <Calendar className="h-5 w-5" />
                        <span>My Bookings</span>
                      </button>
                      
                      {profile?.is_host && (
                        <button
                          onClick={() => navigate('/host')}
                          className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left flex items-center space-x-2"
                        >
                          <PlusCircle className="h-5 w-5" />
                          <span>Host Dashboard</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => navigate('/profile')}
                        className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left flex items-center space-x-2"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Profile Settings</span>
                      </button>
                      
                      <div className="border-t pt-4">
                        <Button
                          onClick={handleSignOut}
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="border-t pt-4 space-y-2">
                      <Button 
                        onClick={() => navigate('/auth')}
                        className="w-full" 
                        variant="outline"
                      >
                        Log in
                      </Button>
                      <Button 
                        onClick={() => navigate('/auth')}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500"
                      >
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

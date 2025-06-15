
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Menu, X, Heart, MessageCircle, Calendar, Search, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, profile, signOut, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Sign out failed",
        description: "There was an error signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "There was an error signing you in. Please try email/password authentication.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-rose-500" />
            <span className="text-xl font-bold text-gray-900">StayBook</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-rose-600 transition-colors">
              Explore
            </Link>
            <Link to="/all-listings" className="flex items-center space-x-1 text-gray-700 hover:text-rose-600 transition-colors">
              <Grid className="h-4 w-4" />
              <span>All Listings</span>
            </Link>
            {user && (
              <>
                <Link to="/wishlist" className="flex items-center space-x-1 text-gray-700 hover:text-rose-600 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link to="/bookings" className="flex items-center space-x-1 text-gray-700 hover:text-rose-600 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Trips</span>
                </Link>
                <Link to="/messages" className="flex items-center space-x-1 text-gray-700 hover:text-rose-600 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
                {profile?.is_host && (
                  <Link to="/host" className="text-gray-700 hover:text-rose-600 transition-colors">
                    Host
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {!user && (
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
                className="hidden md:flex"
              >
                Sign in with Google
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 p-2">
                  <Menu className="h-4 w-4" />
                  {user ? (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={profile?.avatar_url || undefined} />
                      <AvatarFallback>
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {user ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/all-listings')}>
                      <Grid className="mr-2 h-4 w-4" />
                      All Listings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/bookings')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      My Trips
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/messages')}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Messages
                    </DropdownMenuItem>
                    {profile?.is_host && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/host')}>
                          <Home className="mr-2 h-4 w-4" />
                          Host Dashboard
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/auth')}>
                      Sign in
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleGoogleSignIn}>
                      Sign in with Google
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/auth')}>
                      Sign up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                <span>Explore</span>
              </Link>
              <Link 
                to="/all-listings" 
                className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Grid className="h-4 w-4" />
                <span>All Listings</span>
              </Link>
              {user && (
                <>
                  <Link 
                    to="/wishlist" 
                    className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>My Trips</span>
                  </Link>
                  <Link 
                    to="/messages" 
                    className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                  {profile?.is_host && (
                    <Link 
                      to="/host" 
                      className="flex items-center space-x-2 px-2 py-1 text-gray-700 hover:text-rose-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Home className="h-4 w-4" />
                      <span>Host Dashboard</span>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

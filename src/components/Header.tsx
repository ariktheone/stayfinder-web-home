
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, User, Home } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">StayFinder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Explore
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Become a Host
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Help
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" className="text-gray-700">
                  Log in
                </Button>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                  Sign up
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Badge variant="secondary">Host</Badge>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
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
                  <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                    Explore
                  </a>
                  <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                    Become a Host
                  </a>
                  <a href="#" className="text-lg font-medium text-gray-700 hover:text-blue-600">
                    Help
                  </a>
                  <div className="border-t pt-4 space-y-2">
                    <Button className="w-full" variant="outline">
                      Log in
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500">
                      Sign up
                    </Button>
                  </div>
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

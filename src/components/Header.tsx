
import React from 'react';
import { Button } from "@/components/ui/button";
import { Hospital, User, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-20">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Hospital className="h-8 w-8 text-health-600" />
          <div>
            <h1 className="text-2xl font-bold text-health-800">HealthNexus<span className="text-remedy-500">AI</span></h1>
            <p className="text-xs text-muted-foreground">AI-Powered Disease Prevention & Drug Discovery</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="text-health-800 hover:text-health-600 font-medium px-3 py-2">
                  Dashboard
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-health-800 hover:text-health-600 font-medium">
                  Disease Analysis
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <div className="p-3 hover:bg-health-50 rounded-md">
                      <h4 className="text-sm font-medium text-health-800">Symptom Analyzer</h4>
                      <p className="text-xs text-muted-foreground">
                        Input your symptoms for AI-powered analysis and possible causes
                      </p>
                    </div>
                    <div className="p-3 hover:bg-health-50 rounded-md">
                      <h4 className="text-sm font-medium text-health-800">Common Diseases</h4>
                      <p className="text-xs text-muted-foreground">
                        Browse information on frequent health conditions
                      </p>
                    </div>
                    <div className="p-3 hover:bg-health-50 rounded-md">
                      <h4 className="text-sm font-medium text-health-800">Risk Assessment</h4>
                      <p className="text-xs text-muted-foreground">
                        Evaluate your risk factors for various health conditions
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-health-800 hover:text-health-600 font-medium">
                  Formula Library
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/formula-library" className="p-3 hover:bg-remedy-50 rounded-md">
                      <h4 className="text-sm font-medium text-remedy-800">AI Chatbot Assistant</h4>
                      <p className="text-xs text-muted-foreground">
                        Chat with our AI to get personalized formula recommendations
                      </p>
                    </Link>
                    <div className="p-3 hover:bg-remedy-50 rounded-md">
                      <h4 className="text-sm font-medium text-remedy-800">Formula Categories</h4>
                      <p className="text-xs text-muted-foreground">
                        Browse formulas by health condition or ingredient type
                      </p>
                    </div>
                    <div className="p-3 hover:bg-remedy-50 rounded-md">
                      <h4 className="text-sm font-medium text-remedy-800">Research Database</h4>
                      <p className="text-xs text-muted-foreground">
                        Access scientific research behind our formula recommendations
                      </p>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/" className="text-health-800 hover:text-health-600 font-medium px-3 py-2">
                  Health Trends
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-5 w-5 text-health-700" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-health-700" />
          </Button>
          <Button className="bg-health-600 hover:bg-health-700 text-white rounded-full hidden md:flex">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6 text-health-700" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-health-100 py-4">
          <nav className="container mx-auto px-4">
            <ul className="space-y-4">
              <li><Link to="/" className="block text-health-800 hover:text-health-600 font-medium py-2">Dashboard</Link></li>
              <li><a href="#" className="block text-health-800 hover:text-health-600 font-medium py-2">Disease Analysis</a></li>
              <li><Link to="/formula-library" className="block text-health-800 hover:text-health-600 font-medium py-2">Formula Library</Link></li>
              <li><a href="#" className="block text-health-800 hover:text-health-600 font-medium py-2">Health Trends</a></li>
            </ul>
            <div className="mt-4">
              <Button className="w-full bg-health-600 hover:bg-health-700 text-white rounded-full">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

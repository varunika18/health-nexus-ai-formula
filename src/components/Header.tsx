
import React from 'react';
import { Button } from "@/components/ui/button";
import { Hospital, User, Search } from 'lucide-react';

const Header = () => {
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
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#" className="text-health-800 hover:text-health-600 font-medium">Dashboard</a></li>
              <li><a href="#" className="text-health-800 hover:text-health-600 font-medium">Disease Analysis</a></li>
              <li><a href="#" className="text-health-800 hover:text-health-600 font-medium">Formula Library</a></li>
              <li><a href="#" className="text-health-800 hover:text-health-600 font-medium">Health Trends</a></li>
            </ul>
          </nav>
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
        </div>
      </div>
    </header>
  );
};

export default Header;

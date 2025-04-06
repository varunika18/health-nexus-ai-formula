
import React from 'react';
import { Hospital } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-health-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Hospital className="h-8 w-8 text-white" />
              <h2 className="text-xl font-bold">HealthNexus<span className="text-remedy-300">AI</span></h2>
            </div>
            <p className="text-sm text-health-100">
              Revolutionizing healthcare with AI-powered disease prevention and drug discovery.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-health-100">
              <li><a href="#" className="hover:text-white">AI Diagnosis</a></li>
              <li><a href="#" className="hover:text-white">Formula Library</a></li>
              <li><a href="#" className="hover:text-white">Health Trends</a></li>
              <li><a href="#" className="hover:text-white">Virtual Consultation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-health-100">
              <li><a href="#" className="hover:text-white">Research Papers</a></li>
              <li><a href="#" className="hover:text-white">Health Blog</a></li>
              <li><a href="#" className="hover:text-white">API Documentation</a></li>
              <li><a href="#" className="hover:text-white">For Researchers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-health-100">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-health-700 mt-8 pt-6 text-sm text-health-200 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 HealthNexus AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Disclaimer: This platform is for informational purposes only and does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

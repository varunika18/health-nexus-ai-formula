
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import FormulaRecommendation from "@/components/FormulaRecommendation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Lightbulb } from 'lucide-react';
import { formulas } from '@/lib/mockData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FormulaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const categories = [...new Set(formulas.map(formula => formula.description.split(' ')[0]))];
  
  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = searchTerm === '' || 
      formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === null || 
      formula.description.startsWith(categoryFilter);
      
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-remedy-50 via-white to-remedy-100 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-remedy-900 mb-4">
                AI-Powered Formula Library
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
                Discover natural formulas based on AI analysis and cutting-edge research. Chat with our AI assistant to find personalized recommendations.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="formulas" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2">
                <TabsTrigger value="formulas">Formula Database</TabsTrigger>
                <TabsTrigger value="chat">AI Formula Assistant</TabsTrigger>
              </TabsList>
              
              <TabsContent value="formulas" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search formulas..." 
                      className="pl-10 border-remedy-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" /> 
                        {categoryFilter ? `Category: ${categoryFilter}` : 'Filter by Category'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                          All Categories
                        </DropdownMenuItem>
                        {categories.map((category) => (
                          <DropdownMenuItem 
                            key={category} 
                            onClick={() => setCategoryFilter(category)}
                          >
                            {category}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFormulas.length > 0 ? (
                    filteredFormulas.map((formula) => (
                      <FormulaRecommendation
                        key={formula.id}
                        name={formula.name}
                        components={formula.components}
                        description={formula.description}
                        effectiveness={formula.effectiveness}
                        researchBasis={formula.researchBasis}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Lightbulb className="h-12 w-12 text-remedy-300 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-remedy-700 mb-2">No formulas found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search or filters to find more results.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="chat" className="pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-medium text-remedy-800 mb-4">Chat with our Formula Assistant</h2>
                    <p className="text-muted-foreground mb-6">
                      Describe your symptoms or health concerns, and our AI will suggest personalized formulas and remedies based on cutting-edge research.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-remedy-50 rounded-lg border border-remedy-100">
                        <h3 className="font-medium text-remedy-700 mb-2">How to get the best recommendations:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="bg-remedy-200 text-remedy-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                            <span>Describe your symptoms in detail</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-remedy-200 text-remedy-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                            <span>Mention any health conditions you have</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-remedy-200 text-remedy-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                            <span>Ask specific questions about formulas</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-remedy-50 rounded-lg border border-remedy-100">
                        <p className="text-xs text-muted-foreground">
                          <strong>Note:</strong> This AI assistant is for informational purposes only. Always consult with healthcare professionals before trying any new treatments.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <ChatInterface />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FormulaLibrary;

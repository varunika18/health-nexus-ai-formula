
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import FormulaRecommendation from "@/components/FormulaRecommendation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Lightbulb, BookOpen, Beaker, ArrowRight } from 'lucide-react';
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
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-health-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-remedy-50 via-white to-health-100 py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-remedy-200 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-health-200 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-remedy-900 mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-health-700 to-remedy-700">
                  AI-Powered Formula Library
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover natural formulas based on AI analysis and cutting-edge research. Chat with our AI assistant to find personalized recommendations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-health-600 hover:bg-health-700 rounded-full px-6">
                  Explore Formulas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-remedy-300 text-remedy-700 hover:bg-remedy-50 rounded-full px-6">
                  Learn More <BookOpen className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="formulas" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto mb-8 grid-cols-2 bg-gradient-to-r from-health-100 to-remedy-100 p-1 rounded-full">
                <TabsTrigger value="formulas" className="rounded-full data-[state=active]:bg-white">Formula Database</TabsTrigger>
                <TabsTrigger value="chat" className="rounded-full data-[state=active]:bg-white">AI Formula Assistant</TabsTrigger>
              </TabsList>
              
              <TabsContent value="formulas" className="space-y-8 animate-fade-in">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search formulas..." 
                      className="pl-10 border-remedy-200 rounded-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 rounded-full">
                        <Filter className="h-4 w-4" /> 
                        {categoryFilter ? `Category: ${categoryFilter}` : 'Filter by Category'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-lg border-remedy-200 shadow-md">
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
              
              <TabsContent value="chat" className="pt-4 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-medium text-remedy-800 mb-4">Chat with our Formula Assistant</h2>
                    <p className="text-muted-foreground mb-6">
                      Describe your symptoms or health concerns, and our AI will suggest personalized formulas and remedies based on cutting-edge research.
                    </p>
                    <div className="space-y-4">
                      <Card className="bg-gradient-to-br from-remedy-50 to-white border-remedy-100 shadow-md">
                        <CardContent className="p-6">
                          <h3 className="font-medium text-remedy-700 mb-4 flex items-center gap-2">
                            <Beaker className="h-5 w-5 text-remedy-500" />
                            How to get the best recommendations:
                          </h3>
                          <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                              <span className="bg-remedy-200 text-remedy-700 rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                              <span>Describe your symptoms in detail, including duration and severity</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-remedy-200 text-remedy-700 rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                              <span>Mention any underlying health conditions or medications</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="bg-remedy-200 text-remedy-700 rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                              <span>Ask specific questions about recommended formulas</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-br from-health-50 to-white border-health-100 shadow-md">
                        <CardContent className="p-6">
                          <p className="text-sm text-health-700">
                            <strong className="text-health-800">Important:</strong> This AI assistant is for informational purposes only. Always consult with healthcare professionals before trying any new treatments.
                          </p>
                        </CardContent>
                      </Card>
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

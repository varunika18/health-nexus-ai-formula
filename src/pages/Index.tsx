
import React, { useState } from 'react';
import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";
import DiseaseCard from "@/components/DiseaseCard";
import FormulaRecommendation from "@/components/FormulaRecommendation";
import HealthTrends from "@/components/HealthTrends";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { diseases, formulas } from '@/lib/mockData';
import { Hospital, Lightbulb, ChartLine, Search } from 'lucide-react';

const Index = () => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<number | null>(null);
  
  const getRelatedFormulas = (diseaseId: number | null) => {
    if (diseaseId === null) return [];
    return formulas.filter(formula => formula.diseaseId === diseaseId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-health-50 via-white to-remedy-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-health-900 leading-tight mb-4">
                  Revolutionizing Healthcare with <span className="text-health-600">AI-Powered</span> Solutions
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Uncover disease causes, discover natural remedies, and access AI-driven healthcare insights for improved wellness globally.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-health-600 hover:bg-health-700 text-white rounded-full">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full border-health-300">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="bg-white p-6 rounded-2xl shadow-xl relative z-10 max-w-md animate-pulse-slow">
                    <div className="flex mb-4 items-center">
                      <Hospital className="h-8 w-8 text-health-600 mr-3" />
                      <h3 className="text-xl font-semibold text-health-800">HealthNexus AI</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      "Our AI has analyzed your symptoms and identified potential causes with 94% confidence..."
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-health-100 text-health-800 text-sm rounded-full">Symptom Analysis</span>
                      <span className="px-2 py-1 bg-remedy-100 text-remedy-800 text-sm rounded-full">Formula Suggestion</span>
                    </div>
                    <div className="h-2 w-full bg-health-100 rounded-full overflow-hidden">
                      <div className="h-2 bg-health-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-health-300/20 to-remedy-300/20 rounded-full blur-3xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-health-900 mb-4">Powered by Advanced AI Technology</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our platform combines cutting-edge AI models with healthcare expertise to deliver personalized insights and solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="health-card p-6">
                <div className="rounded-full bg-health-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-health-600" />
                </div>
                <h3 className="text-xl font-medium text-health-800 mb-3">AI Disease Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms analyze symptoms and identify possible causes with high accuracy for early intervention.
                </p>
              </div>
              
              <div className="health-card p-6">
                <div className="rounded-full bg-remedy-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-remedy-600" />
                </div>
                <h3 className="text-xl font-medium text-health-800 mb-3">Formula Recommendations</h3>
                <p className="text-muted-foreground">
                  AI-generated alternative compounds that work similarly to conventional drugs, backed by research.
                </p>
              </div>
              
              <div className="health-card p-6">
                <div className="rounded-full bg-health-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <ChartLine className="h-6 w-6 text-health-600" />
                </div>
                <h3 className="text-xl font-medium text-health-800 mb-3">Health Trend Analysis</h3>
                <p className="text-muted-foreground">
                  Identify regional health patterns and receive proactive prevention strategies tailored to your area.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* AI Assistant Demo */}
        <section className="py-16 bg-gradient-to-br from-health-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-health-900 mb-4">Experience Our AI Health Assistant</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Interact with our advanced AI to analyze symptoms, understand conditions, and discover helpful formulas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ChatInterface />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-health-800">Possible Conditions</h3>
                <div className="grid grid-cols-1 gap-4">
                  {diseases.map((disease) => (
                    <DiseaseCard
                      key={disease.id}
                      name={disease.name}
                      description={disease.description}
                      symptoms={disease.symptoms}
                      causes={disease.causes}
                      onSelect={() => setSelectedDiseaseId(disease.id)}
                      isSelected={selectedDiseaseId === disease.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Formula Recommendations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-health-900 mb-4">AI-Generated Formula Recommendations</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Based on the identified conditions, our AI suggests these research-backed formulations that may help.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedDiseaseId ? (
                getRelatedFormulas(selectedDiseaseId).map((formula) => (
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
                formulas.map((formula) => (
                  <FormulaRecommendation
                    key={formula.id}
                    name={formula.name}
                    components={formula.components}
                    description={formula.description}
                    effectiveness={formula.effectiveness}
                    researchBasis={formula.researchBasis}
                  />
                ))
              )}
            </div>
          </div>
        </section>
        
        {/* Health Trends Section */}
        <section className="py-16 bg-gradient-to-br from-health-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-health-900 mb-4">Global Health Trend Analysis</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our AI continuously monitors and analyzes health data from around the world to identify emerging trends and provide proactive recommendations.
              </p>
            </div>
            
            <HealthTrends />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-health-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Healthcare with AI?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join us in revolutionizing disease prevention and treatment approaches with cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default" className="bg-white text-health-700 hover:bg-health-50 rounded-full">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-health-500 rounded-full">
                Request a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

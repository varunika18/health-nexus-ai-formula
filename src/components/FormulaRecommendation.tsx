
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FormulaProps {
  name: string;
  components: string[];
  description: string;
  effectiveness: number;
  researchBasis: string;
}

const FormulaRecommendation = ({ 
  name, 
  components, 
  description, 
  effectiveness, 
  researchBasis 
}: FormulaProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-remedy-200 bg-gradient-to-br from-white to-remedy-50 h-full">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
        <div className="bg-gradient-to-br from-remedy-300 to-transparent rounded-full w-full h-full transform translate-x-1/3 -translate-y-1/3" />
      </div>
      <CardHeader className="pb-2 relative z-10">
        <div className="flex items-start">
          <Lightbulb className="h-5 w-5 text-remedy-500 mt-1 mr-2 shrink-0" />
          <div>
            <CardTitle className="text-xl text-remedy-800 font-bold">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-xs uppercase font-semibold text-remedy-700">AI Formula Effectiveness Rating</h4>
            <span className="font-semibold text-sm text-remedy-800">{effectiveness}%</span>
          </div>
          <Progress value={effectiveness} className="h-2 bg-remedy-100">
            <div className="bg-gradient-to-r from-remedy-300 to-remedy-500"></div>
          </Progress>
          <p className="text-xs text-muted-foreground mt-1">Based on research and AI analysis</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-xs uppercase font-semibold text-remedy-700 flex items-center gap-1 mb-1">
              <BookOpen className="h-3 w-3" />
              Research Basis
            </h4>
            <p className="text-xs text-muted-foreground">{researchBasis}</p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase font-semibold text-remedy-700 mb-1">Key Components</h4>
            <div className="flex flex-wrap gap-1">
              {components.map((component, index) => (
                <Badge key={index} variant="outline" className="bg-white/80 text-remedy-700 border-remedy-200 hover:bg-remedy-50 transition-colors">
                  {component}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-remedy-600 hover:text-remedy-800 hover:bg-remedy-100 w-full mt-2 flex items-center justify-center gap-1 group">
          Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormulaRecommendation;

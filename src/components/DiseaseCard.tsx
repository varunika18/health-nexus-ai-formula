
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Circle, CircleCheck, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DiseaseCardProps {
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  onSelect: () => void;
  isSelected?: boolean;
}

const DiseaseCard = ({ 
  name, 
  description, 
  symptoms, 
  causes, 
  onSelect,
  isSelected = false
}: DiseaseCardProps) => {
  return (
    <Card 
      className={`health-card cursor-pointer transition-all ${isSelected ? 'border-health-400 shadow-lg' : 'hover:border-health-300'}`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-health-800 flex items-center gap-2">
            {name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-health-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">AI-identified potential condition based on symptoms</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          {isSelected ? (
            <CircleCheck className="h-5 w-5 text-health-600" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        
        <div className="mb-3">
          <h4 className="text-xs uppercase font-semibold text-health-800 mb-1">Common Symptoms</h4>
          <div className="flex flex-wrap gap-1">
            {symptoms.slice(0, 4).map((symptom, index) => (
              <Badge key={index} variant="outline" className="bg-health-50 text-health-700 border-health-200">
                {symptom}
              </Badge>
            ))}
            {symptoms.length > 4 && (
              <Badge variant="outline" className="bg-white text-muted-foreground">
                +{symptoms.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs uppercase font-semibold text-health-800 mb-1">Potential Causes</h4>
          <div className="flex flex-wrap gap-1">
            {causes.slice(0, 3).map((cause, index) => (
              <Badge key={index} variant="outline" className="bg-white text-muted-foreground">
                {cause}
              </Badge>
            ))}
            {causes.length > 3 && (
              <Badge variant="outline" className="bg-white text-muted-foreground">
                +{causes.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseCard;

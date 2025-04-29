
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, ActivitySquare, Microscope } from 'lucide-react';

interface DiseaseAnalysisProps {
  diseaseName: string;
  symptoms: string[];
  causes: string[];
  confidence: number;
}

export const DiseaseAnalysis = ({
  diseaseName,
  symptoms,
  causes,
  confidence
}: DiseaseAnalysisProps) => {
  return (
    <Card className="border-health-200 bg-gradient-to-br from-health-50 to-white shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-2 border-b border-health-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-health-600" />
            <CardTitle className="text-lg font-bold text-health-800">
              {diseaseName}
            </CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`
              ${confidence >= 80 ? 'bg-green-50 text-green-700 border-green-200' : 
                confidence >= 50 ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                'bg-red-50 text-red-700 border-red-200'}
            `}
          >
            {confidence}% Confidence
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-3 space-y-3">
        <div>
          <h4 className="text-xs uppercase font-semibold text-health-700 mb-1 flex items-center gap-1">
            <ActivitySquare className="h-3 w-3" />
            Identified Symptoms
          </h4>
          <div className="flex flex-wrap gap-1">
            {symptoms.slice(0, 4).map((symptom, index) => (
              <Badge key={index} variant="outline" className="bg-health-50 text-health-700 border-health-200">
                <CircleCheck className="h-3 w-3 mr-1 text-health-600" />
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
          <h4 className="text-xs uppercase font-semibold text-health-700 mb-1">Potential Causes</h4>
          <div className="flex flex-wrap gap-1">
            {causes.map((cause, index) => (
              <Badge key={index} variant="outline" className="bg-white text-muted-foreground">
                {cause}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

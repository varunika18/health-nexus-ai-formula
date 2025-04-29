
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartLine, Info, TrendingUp } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { healthTrends } from '@/lib/mockData';

const HealthTrends = () => {
  const regions = healthTrends.map(region => region.region);
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [showDetail, setShowDetail] = useState(false);
  
  const getChartData = (regionName: string) => {
    const region = healthTrends.find(r => r.region === regionName);
    
    if (!region) return [];
    
    return region.topConditions.map((condition, index) => ({
      name: condition,
      value: region.prevalence[index]
    }));
  };

  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    setShowDetail(true);
  };

  const getRegionalInsights = (regionName: string) => {
    const region = healthTrends.find(r => r.region === regionName);
    if (!region) return null;
    
    return {
      topTrend: region.topConditions[0],
      prevalence: region.prevalence[0],
      growth: 'Increasing', // Setting default value since it's not in the type
      recommendations: [
        `Increase awareness about ${region.topConditions[0]} prevention`,
        `Screen for early signs of ${region.topConditions[1]}`,
        `Monitor ${region.topConditions[2]} risk factors in the population`
      ]
    };
  };

  const insights = getRegionalInsights(activeRegion);

  return (
    <Card className="border-health-100 shadow-md overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-health-50 to-white border-b border-health-100">
        <div className="flex items-center gap-2">
          <ChartLine className="h-5 w-5 text-health-600" />
          <CardTitle className="text-lg text-health-800">Regional Health Trends</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue={regions[0]} className="w-full" onValueChange={handleRegionChange}>
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
            {regions.map(region => (
              <TabsTrigger 
                value={region} 
                key={region}
                className="data-[state=active]:bg-health-50 data-[state=active]:text-health-800"
              >
                {region}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {regions.map(region => (
            <TabsContent value={region} key={region} className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getChartData(region)}
                    margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ 
                        value: 'Prevalence (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fontSize: 12 }
                      }} 
                    />
                    <RechartsTooltip />
                    <Bar 
                      dataKey="value" 
                      name="Prevalence (%)"
                      fill="#0ea5e9" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {showDetail && region === activeRegion && insights && (
                <div className="mt-6 p-4 bg-health-50 rounded-lg animate-fade-in border border-health-100">
                  <h4 className="text-md font-medium text-health-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-health-600" />
                    Key Insights for {activeRegion}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-health-700">
                        <span className="font-medium">Top Condition:</span> {insights.topTrend}
                      </p>
                      <p className="text-sm text-health-700">
                        <span className="font-medium">Prevalence:</span> {insights.prevalence}%
                      </p>
                      <p className="text-sm text-health-700">
                        <span className="font-medium">Trend:</span> {insights.growth}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-health-700 mb-1">Recommendations:</p>
                      <ul className="text-xs text-health-700 space-y-1 list-disc pl-4">
                        {insights.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-center text-muted-foreground flex items-center justify-center mt-2">
                <Info className="h-3 w-3 mr-1" />
                Top health conditions in {region} identified by AI analysis
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HealthTrends;

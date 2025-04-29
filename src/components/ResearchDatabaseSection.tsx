
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Database, BookOpen, ExternalLink, FileText } from 'lucide-react';

// Mock research papers data
const researchPapers = [
  {
    id: 1,
    title: "Efficacy of Natural Compounds in Hypertension Management",
    authors: ["Johnson, M.", "Smith, A.", "Williams, R."],
    journal: "Journal of Natural Medicine",
    year: 2023,
    abstract: "This study examines the effectiveness of hibiscus extract, hawthorn berry, and garlic extract in managing hypertension through a double-blind placebo-controlled trial.",
    keywords: ["hypertension", "natural compounds", "clinical trial"],
    relevantFormulas: ["Natural BP Support Formula"]
  },
  {
    id: 2,
    title: "Botanical Interventions for Type 2 Diabetes: A Systematic Review",
    authors: ["Chen, L.", "Patel, S.", "Garcia, J."],
    journal: "International Journal of Herbal Medicine",
    year: 2022,
    abstract: "A comprehensive review of botanical interventions for type 2 diabetes, focusing on cinnamon, gymnema sylvestre, and bitter melon extract.",
    keywords: ["diabetes", "botanical interventions", "systematic review"],
    relevantFormulas: ["Glucose Balance Complex", "Metabolic Balance Formula"]
  },
  {
    id: 3,
    title: "Anti-inflammatory Effects of Turmeric and Boswellia in Joint Health",
    authors: ["Singh, P.", "Anderson, K.", "Lee, H."],
    journal: "Rheumatology Research",
    year: 2023,
    abstract: "This research explores the synergistic effects of turmeric and boswellia serrata extracts on inflammatory markers in patients with osteoarthritis.",
    keywords: ["anti-inflammatory", "turmeric", "boswellia", "joint health"],
    relevantFormulas: ["Joint Comfort Formula"]
  },
  {
    id: 4,
    title: "Elderberry Extract in Upper Respiratory Tract Infections: A Meta-analysis",
    authors: ["Brown, T.", "Miller, E.", "Thompson, S."],
    journal: "Phytomedicine International",
    year: 2021,
    abstract: "A meta-analysis of clinical trials investigating the efficacy of elderberry extract in reducing duration and severity of upper respiratory tract infections.",
    keywords: ["elderberry", "respiratory infections", "meta-analysis"],
    relevantFormulas: ["Respiratory Support Blend"]
  },
  {
    id: 5,
    title: "Herbal Approaches to Digestive Health: Focus on GERD Management",
    authors: ["Lopez, R.", "Kim, J.", "Patel, A."],
    journal: "Digestive Health Research",
    year: 2022,
    abstract: "An investigation into traditional herbal remedies including licorice, aloe vera, and slippery elm in the management of gastroesophageal reflux disease symptoms.",
    keywords: ["GERD", "digestive health", "herbal medicine"],
    relevantFormulas: ["Digestive Harmony Blend"]
  }
];

export const ResearchDatabaseSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<typeof researchPapers>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  
  // Get all unique keywords
  const allKeywords = Array.from(new Set(
    researchPapers.flatMap(paper => paper.keywords)
  )).sort();
  
  // Generate search suggestions based on current input
  useEffect(() => {
    if (searchTerm.length > 1) {
      const allTerms = new Set<string>();
      
      // Add titles to suggestions
      researchPapers.forEach(paper => {
        const words = paper.title.toLowerCase().split(' ');
        words.forEach(word => {
          if (word.length > 3 && word.toLowerCase().includes(searchTerm.toLowerCase())) {
            allTerms.add(word);
          }
        });
        
        // Add keywords to suggestions
        paper.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(searchTerm.toLowerCase())) {
            allTerms.add(keyword);
          }
        });
        
        // Add author names to suggestions
        paper.authors.forEach(author => {
          if (author.toLowerCase().includes(searchTerm.toLowerCase())) {
            allTerms.add(author.replace(',', ''));
          }
        });
      });
      
      setSearchSuggestions(Array.from(allTerms).slice(0, 5));
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchTerm]);
  
  // Filter research papers based on search term and selected keywords
  useEffect(() => {
    const filteredPapers = researchPapers.filter(paper => {
      const matchesSearch = searchTerm === '' || 
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesKeywords = selectedKeywords.length === 0 ||
        selectedKeywords.every(keyword => paper.keywords.includes(keyword));
        
      return matchesSearch && matchesKeywords;
    });
    
    setSearchResults(filteredPapers);
  }, [searchTerm, selectedKeywords]);
  
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };
  
  const handleSearchSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSearchSuggestions(false);
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-health-200 shadow-sm h-full">
            <CardHeader className="pb-3 border-b border-health-100">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="h-5 w-5 text-health-600" />
                Research Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-health-700">Research Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {allKeywords.map(keyword => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className={`cursor-pointer transition-all ${
                        selectedKeywords.includes(keyword)
                          ? 'bg-health-100 border-health-300 text-health-800'
                          : 'bg-white text-muted-foreground hover:bg-health-50'
                      }`}
                      onClick={() => toggleKeyword(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedKeywords.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedKeywords([])} 
                  className="text-xs text-muted-foreground w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search research by title, author, or content..." 
              className="pl-10 border-health-200 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm.length > 1 && setShowSearchSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
            />
            
            {/* Search suggestions */}
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-health-100 animate-fade-in">
                <ul className="py-1">
                  {searchSuggestions.map((suggestion, index) => (
                    <li 
                      key={index}
                      className="px-4 py-2 text-sm hover:bg-health-50 cursor-pointer flex items-center"
                      onClick={() => handleSearchSuggestionClick(suggestion)}
                    >
                      <Search className="h-3 w-3 mr-2 text-health-500" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {searchResults.length > 0 ? (
              searchResults.map(paper => (
                <Card key={paper.id} className="hover:shadow-md transition-all border-health-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="font-medium text-health-800 hover:text-health-600 transition-colors">
                            {paper.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {paper.authors.join(", ")} • {paper.journal} • {paper.year}
                          </p>
                        </div>
                        
                        <p className="text-sm">{paper.abstract}</p>
                        
                        <div className="pt-2 space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {paper.keywords.map(keyword => (
                              <Badge key={keyword} variant="outline" className="bg-health-50 text-health-700 border-health-200">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                          
                          {paper.relevantFormulas.length > 0 && (
                            <div className="pt-1">
                              <p className="text-xs text-muted-foreground mb-1">Related Formulas:</p>
                              <div className="flex flex-wrap gap-1">
                                {paper.relevantFormulas.map(formula => (
                                  <Badge key={formula} className="bg-remedy-100 text-remedy-700 border-none">
                                    {formula}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-health-500 hover:text-health-700 hover:bg-health-50">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-health-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-health-700 mb-2">No research papers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find relevant research.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchDatabaseSection;

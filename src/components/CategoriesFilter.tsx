
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Filter } from 'lucide-react';

interface CategoriesFilterProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  searchResults?: number;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory,
  searchResults
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className={`cursor-pointer transition-all hover:bg-remedy-50 ${
              activeCategory === category 
                ? 'bg-remedy-100 border-remedy-300 text-remedy-800 shadow-sm' 
                : 'bg-white text-muted-foreground'
            }`}
            onClick={() => onSelectCategory(activeCategory === category ? null : category)}
          >
            {activeCategory === category && <Filter className="h-3 w-3 mr-1" />}
            {category}
          </Badge>
        ))}
      </div>
      
      {activeCategory && (
        <p className="text-xs text-muted-foreground">
          Showing formulas for <span className="font-medium text-remedy-600">{activeCategory}</span>
        </p>
      )}
      
      {searchResults !== undefined && searchResults >= 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Found <span className="font-medium text-remedy-600">{searchResults}</span> matching results
        </p>
      )}
    </div>
  );
};

export default CategoriesFilter;

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortComponentProps {
  sortOption: string | null; 
  onSortChange: (value: string) => void; 
}

const SortComponent: React.FC<SortComponentProps> = ({
  sortOption,
  onSortChange,
}) => {
  const handleSortChange = (value: string) => {
    onSortChange(value);
  };

  return (
    <div className="flex items-center justify-center px-5 py-3">
      <Select onValueChange={handleSortChange} value={sortOption || "featured"}>
        <SelectTrigger className="w-full sm:w-[180px] border-none focus:ring-0">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          {/* Add more sorting options as needed */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortComponent;

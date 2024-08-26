import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterComponentProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value });
  };

  return (
    <div className="flex items-center justify-center border-x px-5 py-3">
      {/* <Label>Filter: </Label> */}
      <Select
        onValueChange={handleCategoryChange}
        value={filters.category || "all"}
      >
        <SelectTrigger className="w-[120px] border-none focus:ring-0">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="vintage">Vintage</SelectItem>
          <SelectItem value="clutch">Clutch</SelectItem>
          {/* Add more categories as needed */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterComponent;

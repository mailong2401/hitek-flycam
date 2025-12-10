import { Search, Tag, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useRef, useEffect } from "react";
interface BlogSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortBy: "newest" | "popular";
  setSortBy: (value: "newest" | "popular") => void;
  categories: string[];
  clearFilters: () => void;
}

export default function BlogSearchFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  categories,
  clearFilters
}: BlogSearchFiltersProps) {
  return (
    <Card className="mb-8 shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box với ARIA label */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <Input
              placeholder="Tìm kiếm bài viết về drone, flycam, UAV, camera bay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-base rounded-2xl border-gray-300 dark:border-gray-700"
              aria-label="Tìm kiếm bài viết trong blog drone Hitek Flycam Việt Nam"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="py-6" aria-label="Lọc theo danh mục drone">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" aria-hidden="true" />
                    <SelectValue placeholder="Danh mục" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories
                    .filter(cat => cat !== "all")
                    .map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Filter */}
            <div className="w-full md:w-48">
              <Select value={sortBy} onValueChange={(value: "newest" | "popular") => setSortBy(value)}>
                <SelectTrigger className="py-6" aria-label="Sắp xếp bài viết drone">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4" aria-hidden="true" />
                    <SelectValue placeholder="Sắp xếp" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || categoryFilter !== "all" || sortBy !== "newest") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="py-6"
                aria-label="Xóa tất cả bộ lọc tìm kiếm bài viết drone"
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || categoryFilter !== "all" || sortBy !== "newest") && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Đang lọc:</span>
            {searchTerm && (
              <Badge variant="secondary" className="gap-2">
                Tìm: "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                  aria-label={`Xóa tìm kiếm "${searchTerm}"`}
                >
                  ×
                </button>
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="gap-2">
                Danh mục: {categoryFilter}
                <button 
                  onClick={() => setCategoryFilter("all")} 
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-1"
                  aria-label={`Xóa lọc danh mục ${categoryFilter}`}
                >
                  ×
                </button>
              </Badge>
            )}
            {sortBy !== "newest" && (
              <Badge variant="secondary" className="gap-2">
                Sắp xếp: Phổ biến nhất
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
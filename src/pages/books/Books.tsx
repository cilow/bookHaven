import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { BookType } from "@/lib/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
// import { books } from "@/lib/data";
import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";
import useBooks from "@/hooks/useBooks";
import useCategories from "@/hooks/use-categories";

export default function BooksPage() {
  const { books, isLoading } = useBooks();
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>(books);
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setCurrentPage(1); // Reset page
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setPriceRange("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredBooks.slice(startIndex, endIndex);
  };

  const getPaginationItems = () => {
    const items = [];

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => setCurrentPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  // Filter & sort books
  useEffect(() => {
    let result = [...books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    // When filtering:
    if (activeCategory !== "all") {
      result = result.filter(
        (book) => String(book.categoryId) === activeCategory
      );
    }

    if (priceRange !== "all") {
      switch (priceRange) {
        case "under20":
          result = result.filter((book) => book.sellingPrice < 20);
          break;
        case "20to30":
          result = result.filter(
            (book) => book.sellingPrice >= 20 && book.sellingPrice <= 30
          );
          break;
        case "over30":
          result = result.filter((book) => book.sellingPrice > 30);
          break;
      }
    }

    switch (sortBy) {
      case "priceAsc":
        result.sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case "priceDesc":
        result.sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case "titleAsc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        result.sort((a, b) => Number(a.id) - Number(b.id));
    }

    setFilteredBooks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeCategory, priceRange, sortBy, books]);

  // Update total pages whenever filteredBooks or pageSize changes
  useEffect(() => {
    setTotalPages(Math.ceil(filteredBooks.length / pageSize));
  }, [filteredBooks, pageSize]);

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Skeleton className="w-[300px] h-7 rounded-full" />
          <div className="flex gap-4">
            <Skeleton className="w-60 h-10 rounded-lg" />
            <Skeleton className="w-30 h-10 rounded-lg" />
          </div>
        </div>
        <Skeleton className="w-4xl h-8 rounded-lg my-4" />
        <Skeleton className="w-20 h-3 rounded-lg mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Books Collection</h1>

          <div className="w-full md:w-auto flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 block">
                Price Range
              </label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under20">Under $20</SelectItem>
                  <SelectItem value="20to30">$20 - $30</SelectItem>
                  <SelectItem value="over30">Over $30</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="titleAsc">Title: A to Z</SelectItem>
                  <SelectItem value="titleDesc">Title: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={handleCategoryChange}
        className="mb-8"
      >
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="all">All Books</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={String(category.id)}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground text-sm">
            Showing {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "book" : "books"}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getCurrentPageBooks().map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => {
                setPageSize(Number(val));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="16">16</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          {filteredBooks.length > 0 && totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {getPaginationItems()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}

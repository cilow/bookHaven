import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BookType } from "@/lib/types";
import {
  BookOpen,
  Heart,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";
import BookCard from "@/components/BookCard";
import { useFavorites } from "@/hooks/use-favorites";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "author" | "price">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort favorites based on sort criteria
  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "author") {
      comparison = a.author.localeCompare(b.author);
    } else if (sortBy === "price") {
      comparison = a.price - b.price;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  // Group books by category
  const booksByCategory: Record<string, BookType[]> = {};
  favorites.forEach((book) => {
    if (!booksByCategory[book.category]) {
      booksByCategory[book.category] = [];
    }
    booksByCategory[book.category].push(book);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search favorites..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("title")}>
                By Title{" "}
                {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("author")}>
                By Author{" "}
                {sortBy === "author" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price")}>
                By Price{" "}
                {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? "Descending" : "Ascending"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-lg">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-medium mb-4">No favorites yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start adding books to your favorites to keep track of books you love
            or want to read in the future.
          </p>
          <Button asChild>
            <Link to="/books">Browse Books</Link>
          </Button>
        </div>
      ) : (
        <>
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                All Favorites ({favorites.length})
              </TabsTrigger>
              {Object.keys(booksByCategory).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category} ({booksByCategory[category].length})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="flex justify-end mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFavorites}
                  className="text-muted-foreground"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedFavorites.map((book) => (
                  <div key={book.id} className="relative group">
                    <BookCard book={book} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromFavorites(book.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove from favorites</span>
                    </Button>
                  </div>
                ))}
              </div>

              {filteredFavorites.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No favorites found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </TabsContent>

            {Object.keys(booksByCategory).map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {booksByCategory[category]
                    .filter(
                      (book) =>
                        book.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        book.author
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    )
                    .map((book) => (
                      <div key={book.id} className="relative group">
                        <BookCard book={book} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromFavorites(book.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove from favorites</span>
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      )}
    </div>
  );
}

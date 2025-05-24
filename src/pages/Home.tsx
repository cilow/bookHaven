import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import BookCardSkeleton from "@/components/skeleton/BookCardSkeleton";
import useBooks from "@/hooks/useBooks";

function Home() {
  const { books, isLoading } = useBooks();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 bg-muted rounded-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to BookHaven
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your next favorite book from our carefully curated
            collection.
          </p>
          <Button size="lg" asChild>
            <Link to="/books">Browse Books</Link>
          </Button>
        </div>
      </section>

      <section id="featured" className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Books</h2>
          <Link to="/books" className="text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))
            : books
                .slice(0, 4)
                .map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      <section className="mb-12" id="new-releases">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">New Releases</h2>
          <Link to="/books" className="text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))
            : books
                .slice(4, 8)
                .map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      <section className="bg-muted rounded-lg p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Join Our Book Club</h2>
            <p className="text-muted-foreground mb-6">
              Get exclusive discounts, early access to new releases, and monthly
              reading recommendations.
            </p>
            <div className="flex gap-4">
              <Button>Sign Up Now</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Book club illustration"
              className="rounded-lg shadow-lg"
              width={400}
              height={300}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

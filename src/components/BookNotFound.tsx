import { AlertTriangle } from "lucide-react";

export default function BookNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4 py-12">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-semibold text-red-600 mb-2">
          Book Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn’t find the book you’re looking for. It may have been
          removed or the link is incorrect.
        </p>
        <a
          href="/books"
          className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        >
          Back to Books
        </a>
      </div>
    </div>
  );
}

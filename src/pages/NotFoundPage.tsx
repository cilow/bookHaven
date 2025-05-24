import { Link } from "react-router";

// src/pages/NotFoundPage.tsx
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="text-primary underline">
        Go back home
      </Link>
    </div>
  );
}

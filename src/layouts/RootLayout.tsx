import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { CartProvider } from "@/hooks/use-cart";
import { FavoritesProvider } from "@/hooks/use-favorites";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow ">
            <Outlet />
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default RootLayout;

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BooksPage from "./pages/books/Books";
import Books from "./pages/admin/books/Books";
import BookDetails from "./pages/books/BookDetails";
import CartPage from "./pages/Cart";
import FavoritesPage from "./pages/favourite";
import ProfilePage from "./pages/profile/Profile";
import OrdersPage from "./pages/profile/Orders";
import CheckoutPage from "./pages/Checkout";
import NotFoundPage from "./pages/NotFoundPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/users/Users";
import Orders from "./pages/admin/orders/Oreders";
import Sales from "./pages/admin/sales/Sales";
import NewBookPage from "./pages/admin/books/NewBookPage";

function App() {
  return (
    <Routes>
      {/* Main app layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        <Route path="books">
          <Route index element={<BooksPage />} />
          <Route path=":id" element={<BookDetails />} />
        </Route>

        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritesPage />} />

        <Route path="profile">
          <Route index element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>

        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="books/new" element={<NewBookPage />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  );
}

export default App;

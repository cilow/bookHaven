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
import NewBookPage from "./pages/admin/books/NewBookPage";
import NewUserPage from "./pages/admin/users/NewUserPage";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/Register";
import Purchases from "./pages/admin/purchases/Purchases";
import Suppliers from "./pages/admin/suppliers/Suppliers";
import NewSupplierPage from "./pages/admin/suppliers/NewSupplierPage";
import NewPurchasePage from "./pages/admin/purchases/NewPurchasePage";
import Category from "./pages/admin/category/Category";
import NewCategoryPage from "./pages/admin/category/NewCategoryPage";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import UpdateBookPage from "./pages/admin/books/UpdateBookPage";
import UpdateSupplier from "./pages/admin/suppliers/UpdateSupplier";

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
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      {/* Admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBookPage />} />
          <Route path=":id" element={<UpdateBookPage />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="users/new" element={<NewUserPage />} />
        <Route path="orders" element={<Orders />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="purchases/new" element={<NewPurchasePage />} />
        <Route path="suppliers">
          <Route index element={<Suppliers />} />
          <Route path="new" element={<NewSupplierPage />} />
          <Route path=":id" element={<UpdateSupplier />} />
        </Route>
        <Route path="categories">
          <Route index element={<Category />} />
          <Route path="new" element={<NewCategoryPage />} />
          <Route path=":id" element={<UpdateCategory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

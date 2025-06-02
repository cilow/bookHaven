import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { BookOpen, Heart, MenuIcon, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCart } from "@/hooks/use-cart";
import UserMenu from "./UserMenu";

const links = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const { items } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-background"
      } transition-all duration-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link to="/" className="font-bold text-2xl">
                      BookHaven
                    </Link>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Mobile navigation menu
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-lg p-2 hover:text-primary ${
                        pathname === link.href ? "font-medium text-primary" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <BookOpen />
            </div>
            <span className="truncate text-2xl font-semibold">BookHaven</span>
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      to={link.href}
                      className={`${
                        pathname === link.href ? "bg-gray-100" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/favorites">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Favorites</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full size-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </div>
              </Link>
            </Button>

            {/* User Profile Dropdown */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

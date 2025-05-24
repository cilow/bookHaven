// Sidebar.tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Package,
  ClipboardList,
  Users,
  HandCoins,
  FolderKanban,
  Banknote,
} from "lucide-react";
import { Link } from "react-router";

export const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "dashboard",
  },
  {
    title: "Books",
    icon: BookOpen,
    url: "books",
  },
  {
    title: "Sales",
    icon: ShoppingCart,
    url: "sales",
  },
  {
    title: "Purchases",
    icon: Package,
    url: "purchases",
  },
  {
    title: "Orders",
    icon: ClipboardList,
    url: "orders",
  },
  {
    title: "Users",
    icon: Users,
    url: "users",
  },
  {
    title: "Suppliers",
    icon: HandCoins,
    url: "suppliers",
  },
  {
    title: "Categories",
    icon: FolderKanban,
    url: "categories",
  },
  {
    title: "Bank",
    icon: Banknote,
    url: "bank",
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BookOpen />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">BookHaven</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="py-6">
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

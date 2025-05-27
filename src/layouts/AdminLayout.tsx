import AdminHeader from "@/components/AdminHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";
import { Toaster } from "sonner";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col ">
        <AdminHeader />
        <main className="flex-1 px-4 lg:px-8 ">
          <Outlet />
        </main>
        <Toaster richColors position="bottom-right" />
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;

import AdminHeader from "@/components/AdminHeader";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router";

function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col ">
        <AdminHeader />
        <main className="flex-1 px-4 lg:px-8 ">
          <Outlet />
        </main>
      </main>
    </SidebarProvider>
  );
}

export default AdminLayout;

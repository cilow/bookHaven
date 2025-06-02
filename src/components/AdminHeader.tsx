import AdminUserMenu from "./AdminUserMenu";
import { SidebarTrigger } from "./ui/sidebar";

function AdminHeader() {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-8 flex items-center justify-between">
      <SidebarTrigger />
      <AdminUserMenu />
    </header>
  );
}

export default AdminHeader;

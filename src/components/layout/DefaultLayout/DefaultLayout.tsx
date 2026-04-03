import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/Header";
import { AppSidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="h-14" />
      <SidebarProvider className="flex flex-1 pt-14 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DefaultLayout;

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";
// import Header from "./components/Header";

const DefaultLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider className="flex flex-1 overflow-hidden">
        {/* <Header /> */}
        <AppSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DefaultLayout;

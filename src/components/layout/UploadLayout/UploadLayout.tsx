import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../DefaultLayout/components/Header";
import { AppSidebar } from "../DefaultLayout/components/Sidebar";
import { Outlet } from "react-router-dom";

const UploadLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="h-14" />
      <SidebarProvider
        style={{ minHeight: "unset" }}
        className="flex flex-1 overflow-hidden"
      >
        <AppSidebar />
        <main className="flex-1 overflow-y-auto mt-14">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default UploadLayout;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import Header from "./components/layout/Header";
import { AppSidebar } from "./components/layout/Sidebar";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { getCurrentUser } from "./redux/slices/authSlice";
import { SidebarProvider } from "./components/ui/sidebar";
import { Outlet } from "react-router";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header className="h-14" />
      <SidebarProvider
        style={{ minHeight: "unset" }}
        className="flex flex-1 overflow-hidden"
      >
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}

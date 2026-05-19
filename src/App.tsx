// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import { useAppDispatch } from "./redux/hooks";
import { getCurrentUser } from "./redux/slices/authSlice";
import GlobalModalProvider from "./components/auth/GlobalModalProvider";
import { socket } from "./socket";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      dispatch(getCurrentUser());
    }

    // --- TEST SOCKET ---
    socket.on("connect", () => {
      console.log("🟢 [TEST] Đã kết nối Socket.IO! ID của bạn là:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 [TEST] Đã ngắt kết nối Socket.IO!");
    });
 
    // Clean up
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <>
      <AppRoutes />
      <GlobalModalProvider />
    </>
  );
}

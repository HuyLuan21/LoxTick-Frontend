import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./components/AppRoutes";
import GlobalModalProvider from "./components/auth/GlobalModalProvider";
import { useAppDispatch } from "./redux/hooks";
import { getCurrentUser } from "./redux/slices/authSlice";
import Socket from "./components/Socket";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <>
      <AppRoutes />
      <GlobalModalProvider />
      <Socket />
    </>
  );
}

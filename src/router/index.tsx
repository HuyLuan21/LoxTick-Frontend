// routers/index.tsx
import { createBrowserRouter, Outlet } from "react-router";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div>Trang chủ</div> },
      { path: "explore", element: <div>Khám phá</div> },
      {
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "profile", element: <div>Hồ sơ</div> },
          { path: "settings", element: <div>Cài đặt</div> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login</div>,
  },
]);

export default router;

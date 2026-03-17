import { createBrowserRouter } from "react-router"
import App from "../App"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,        // App là layout wrapper
    children: [
      {
        index: true,
        element: <div>Trang chủ</div>,   // thay bằng component thật
      },
      {
        path: "explore",
        element: <div>Khám phá</div>,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <div>Hồ sơ</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login</div>,   // ngoài App, không có sidebar
  },
])

export default router
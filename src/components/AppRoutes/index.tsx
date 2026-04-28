import HomePage from "@/pages/home";
import { BrowserRouter, Routes, Route } from "react-router";
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import UploadPage from "@/pages/upload";
import ProtectedRoute from "@/router/ProtectedRoute";
import ProfilePage from "@/pages/profile";
import FollowingPage from "@/pages/following";
import FriendsPage from "@/pages/friends";
import ActivityPage from "@/pages/activity";
import MessagePage from "@/pages/message";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chung */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="following" element={<FollowingPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="messages" element={<MessagePage />} />
          <Route path="user/:username" element={<ProfilePage />} />
        </Route>
        {/* Layout riêng */}
        <Route
          path="upload"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

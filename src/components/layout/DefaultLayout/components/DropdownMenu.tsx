import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/selector";
import { useState } from "react";
import LoginModal from "../../../auth/LoginModal";
import { logout } from "@/redux/slices/authSlice";

import ResetModal from "../../../auth/ResetModal";
import { Link } from "react-router-dom";
import { UserAvatar } from "@/components/Avavtar/userAvatar";

export default function DropdownMenu() {
  const dispatch = useAppDispatch();
  const [showReset, setShowReset] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <>
      <div
        className="flex items-center gap-2 px-2 absolute top-4 right-4 
shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-full font-semibold bg-white"
      >
        <Link
          to="404NotFound"
          className="flex items-center gap-2 p-2 hover:bg-black/5 dark:hover:bg-black/10 rounded-full"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            color="inherit"
            fontSize="16"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
          >
            <path d="M28.68 11.5h-4.1v16.39a3.51 3.51 0 1 1-2.34-3.31v-4.21a7.61 7.61 0 1 0 6.44 7.52v-8.34a9.9 9.9 0 0 0 5.86 1.9v-4.1a5.85 5.85 0 0 1-5.86-5.85Z"></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 2a22 22 0 1 0 0 44 22 22 0 0 0 0-44ZM6 24a18 18 0 1 1 36 0 18 18 0 0 1-36 0Z"
            ></path>
          </svg>
          <p className="text-xs truncate w-20 whitespace-nowrap">
            Ủng hộ người phát triển
          </p>
        </Link>
        {currentUser ? (
          <div className="relative">
            {/* Avatar */}
            <div
              className="flex items-center gap-2 m-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <UserAvatar
                className="w-7 h-7 ring-4 ring-[#f2f2f2] dark:ring-gray-300 transition hover:ring-[#e0e0e0] dark:hover:ring-gray-400"
                UserProfile={currentUser}
              />
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden dark:bg-tiktok-dark-bg dark:border-tiktok-dark-border">
                  {/* Xem hồ sơ */}
                  <Link to={`/user/@${currentUser?.username}`}>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-50 transition  dark:hover:bg-tiktok-dark-hover"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="8" r="4" strokeWidth="2" />
                        <path
                          d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Xem hồ sơ
                    </button>
                  </Link>
                  {/* Đăng xuất */}
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition dark:hover:bg-ti"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17 16l4-4m0 0l-4-4m4 4H7"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setShowLogin(true);
              console.log(showLogin);
            }}
            className="px-4 py-2 bg-tiktok-red text-white text-sm font-bold rounded-md hover:opacity-90 transition"
          >
            Đăng nhập
          </button>
        )}
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onForgot={() => {
            setShowLogin(false);
            setShowReset(true);
          }}
        />

        <ResetModal
          isOpen={showReset}
          onClose={() => setShowReset(false)}
          onBack={() => {
            setShowReset(false);
            setShowLogin(true);
          }}
        />
      </div>
    </>
  );
}

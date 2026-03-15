import { useState } from "react";
import LoginModal from "../auth/LoginModal";
import type { User } from "@/types/user.type";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#25f4ee"
              transform="translate(1, 1)"
            />
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#fe2c55"
              transform="translate(-1, -1)"
            />
            <path
              d="M29.5 7.5C27.8 5.6 26.9 3.1 27 0.5H21.2V27.3C21.1 29.5 19.3 31.3 17 31.3C14.7 31.3 12.8 29.4 12.8 27.1C12.8 24.3 15.4 22.2 18.2 23V17C12 16.3 6.9 21.1 6.9 27.1C6.9 33 11.7 37.8 17.6 37.5C23.2 37.2 27.6 32.5 27.6 26.9V13.7C29.9 15.4 32.7 16.4 35.6 16.4V10.6C33 10.6 31 9.4 29.5 7.5Z"
              fill="#161823"
            />
          </svg>
          <span className="text-2xl font-black tracking-tight text-[#161823]">
            LoxTick
          </span>
        </a>

        {/* Search */}
        <div
          className={`flex items-center gap-2 bg-gray-100 rounded-full px-4 h-10 transition-all duration-200 ${searchFocused ? "ring-2 ring-gray-300 w-100" : "w-96"}`}
        >
          <input
            type="text"
            placeholder="Tìm kiếm video"
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <svg
            className="w-4 h-4 text-gray-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50 transition">
            Upload
          </button>

          {isLoggedIn ? (
            <div className="relative">
              {/* Avatar */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm">
                  {user?.display_name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* Tên user */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.display_name}
                      </p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    {/* Xem hồ sơ */}
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
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
                    {/* Đăng xuất */}
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        setIsLoggedIn(false);
                        setUser(null);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
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
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 bg-tiktok-red text-white text-sm font-bold rounded-md hover:opacity-90 transition"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </header>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
          setShowLogin(false);
        }}
      />
    </>
  );
}

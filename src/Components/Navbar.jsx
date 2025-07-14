import { useEffect, useState } from "react";
import useCompanyStore from "../Store/CompanyStore";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light"
  );

  const navigate = useNavigate();

  const { user, isLoggedIn, logout } = useCompanyStore((state) => state);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-[rgba(10,10,10,0.7)] backdrop-blur-md shadow-md border-b border-black/10 dark:border-white/10">
      <div className="text-2xl font-bold text-gray-800 dark:text-white">
        <a href="/">DreamJobs</a>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
        {isLoggedIn && user ? (
          <UserMenu user={user} onSignOut={handleLogOut} />
        ) : (
          <div className="flex items-center space-x-3">
            <a
              href="/login"
              className="text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 px-5 py-2 rounded-2xl transition transform duration-200"
            >
              Company Login
            </a>
            <a
              href="/signup"
              className="text-base font-semibold text-white bg-gray-600 hover:bg-gray-700 hover:scale-105 px-5 py-2 rounded-2xl transition transform duration-200"
            >
              Company Sign Up
            </a>{" "}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

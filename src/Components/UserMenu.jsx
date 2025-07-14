import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, onSignOut }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={user.profileImage || "../default-avatar.svg"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-1 border-black dark:border-white"
        />
        <span className="text-gray-800 dark:text-white font-medium">
          {user.name}
        </span>
      </button>
      {open && (
        <div className="fixed right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg py-2 z-50">
          <button
            onClick={() => navigate("/manage/")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Manage Jobs
          </button>
          <button
            onClick={() => navigate(`/company/${user.companyId}`)}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Company
          </button>
          <button
            onClick={() => navigate(`/update-profile`)}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Update Profile
          </button>
          <button
            onClick={onSignOut}
            className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

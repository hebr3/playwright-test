// src/components/Layout.jsx

import { Outlet, Link, useLocation } from "react-router-dom";
import { ChevronDown, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Helper function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  // Define the navigation links in an array
  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/team", label: "Team" },
    { to: "/projects", label: "Projects" },
    { to: "/calendar", label: "Calendar" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">My App</span>
              <div className="sm:ml-6">
                <div className="flex space-x-4">
                  {navLinks.map(({ to, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        isActive("/to")
                          ? "bg-gray-400 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 bg-white p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                  <User className="h-6 w-6 text-gray-600" />
                  <ChevronDown
                    className={`h-4 w-4 text-gray-600 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

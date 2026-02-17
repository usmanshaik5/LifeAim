import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function TopbarWithSidebar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // clear auth data if you have
    localStorage.removeItem("token"); // optional
    sessionStorage.clear(); // optional

    navigate("/"); // this goes to http://localhost:5173/
  };


  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40  backdrop-blur-sm z-30
        transition-opacity duration-500 ease-out
        ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        style={{
          transform: sidebarOpen
            ? "translateX(0px)"
            : "translateX(-320px)", // must match sidebar width
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="fixed top-0 left-0 h-full w-[320px] bg-white z-40 shadow-2xl"
      >

        <div className="flex items-center px-6 h-16 border-b">
          <span className="text-2xl font-extrabold tracking-wide">
            Life Aim
          </span>
        </div>


        <nav className="p-3 flex flex-col h-full">

          {/* MAIN LINKS */}
          <div className="space-y-1">
            {[
              "/dashboard",
              "/profile",
              "/wallet",
              "/earnings",
              "/network",
              "/investmentlab",
              "/reports",
              "/support",
            ].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `relative block px-4 py-3 transition-all duration-300
          ${isActive
                    ? "text-black font-semibold bg-gray-100 text-base scale-[1.07]"
                    : "text-gray-600 hover:bg-gray-50 text-sm"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active RIGHT Line */}
                    <span
                      className={`absolute right-0 top-0 h-full w-1 rounded-l-full transition-all duration-300
              ${isActive ? "bg-black opacity-100" : "opacity-0"}`}
                    ></span>

                    <span className="transition-all duration-300">
                      {path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* LOGOUT SECTION */}
          <div className="mt-1 border-t border-gray-200">
            <button
              onClick={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
              className="relative block w-full px-4 py-3 text-left text-sm font-medium
      text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>

        </nav>

      </aside>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-black text-white flex items-center px-4 gap-3">


        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl transition duration-300"
        >
          ☰
        </button>

        <div className="flex-1" />

        {/* Theme */}
        {/* <button
          onClick={toggle}
          className="p-2 rounded-xl transition hover:scale-110"
        >
          {dark ? "🌞" : "🌙"}
        </button> */}

        {/* Avatar */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl 
               
               
               transition-all duration-200"
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 bg-indigo-600 
  text-white rounded-full 
  flex items-center justify-center 
  text-sm font-semibold"
            >
              U
            </div>


            {/* Name */}
            <span className="hidden sm:block text-sm font-medium text-gray-700">
              {user?.name || "User"}
            </span>

            {/* Arrow */}
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 
                  ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-3 w-56 
                bg-white rounded-xl 
                border border-gray-200 
                shadow-md
                transition-all duration-200 transform
                ${dropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
          >
            <div className="py-2">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-5 py-2.5 
                   text-sm text-gray-700 
                   hover:bg-gray-100 
                   transition-colors duration-150"
              >
                Profile
              </button>

              <div className="border-t border-gray-200"></div>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-5 py-2.5 
                   text-sm text-red-600 
                   hover:bg-gray-100 
                   transition-colors duration-150"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>


      </header>
      <div className="pt-16">
        {/* page content here */}
      </div>

    </>
  );
}

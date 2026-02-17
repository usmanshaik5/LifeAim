import { NavLink } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30
        transition-opacity duration-700 ease-out
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full
        w-[18rem]
        bg-white z-40 shadow-2xl
        transform-gpu transition-all duration-[900ms]
        ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
        ${open
            ? "translate-x-0 opacity-100"
            : "-translate-x-[110%] opacity-100"
          }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 h-16 border-b">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: "var(--surface)" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <span
            className="font-semibold text-[15px]"
            style={{ color: "var(--text-primary)" }}
          >
            NexusApp
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-3 mt-2 space-y-0.5">
          {[
            "/dashboard",
            "/wallet",
            "/earnings",
            "/network",
            "/reports",
            "/support",
            "/profile",
          ].map((path) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors duration-300
                ${isActive
                  ? "bg-gray-100 text-black"
                  : "text-gray-600 hover:bg-gray-50"}`
              }
            >
              {path.replace("/", "").charAt(0).toUpperCase() +
                path.slice(2)}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

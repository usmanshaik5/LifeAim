import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { signup, user } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400" />

        {/* Soft Light */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
        linear-gradient(to right, white 1px, transparent 1px),
        linear-gradient(to bottom, white 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px"
          }}
        />

      </div>


      {/* ================= HEADER ================= */}
      <header className="main-header fixed top-0 left-0 w-full z-50 
bg-white">




        <div className="header-container">

          {/* LEFT */}
          <div className="header-left">
            <Link to="/" className="brand flex items-center gap-3">

              {/* Logo */}
              <img
                src="/logo.png"
                alt="Life Aim Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />

              {/* Text Section - Single Row */}
              {/* <div className="flex items-baseline gap-3">
                <span className="brand-title font-bold text-3xl sm:text-4xl md:text-5xl">
                  Life Aim
                </span>

                <span className="brand-sub text-sm sm:text-base text-gray-600 whitespace-nowrap">
                  Wealth & Network System
                </span>
              </div> */}

            </Link>
          </div>


          {/* DESKTOP NAV */}
          <nav className="header-nav desktop-nav">
            {["about", "contact", "support"].map((item) => (
              <NavLink key={item} to={`/${item}`} className="nav-link">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="header-right">

            <button
              onClick={toggle}
              className="theme-toggle-btn mt-1"
              aria-label="Toggle Theme"
            >
              <div className={`toggle-track ${dark ? "dark" : ""}`}>
                <div className="toggle-thumb">
                  {dark ? (
                    <svg viewBox="0 0 24 24" className="icon">
                      <path
                        d="M12 3v2m0 14v2m9-9h-2M5 12H3m12.364-6.364l-1.414 1.414M7.05 
            16.95l-1.414 1.414m0-12.728L7.05 
            7.05m10.314 10.314l1.414 1.414M15 
            12a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="icon">
                      <path
                        d="M21 12.79A9 9 0 1111.21 3 
            7 7 0 0021 12.79z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >


              ≣
            </button>

            {!user && (
              <Link to="/signup" className="primary-btn desktop-only">
                Join
              </Link>
            )}

            {user && (
              <Link to="/dashboard" className="primary-btn desktop-only">
                Dashboard
              </Link>
            )}
          </div>

        </div>

        {/* MOBILE DROPDOWN */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

          {["about", "contact", "support"].map((item) => (
            <NavLink
              key={item}
              // to={`/${item}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </div>

      </header>

      {/* ================= MAIN SECTION ================= */}
      <div className="flex flex-1">

        {/* LEFT VISUAL (Desktop Only) */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center p-16 bg-white/10 backdrop-blur-xl"
        >
          <div className="glass-subtle rounded-3xl p-12 max-w-md text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Join the Network
            </h2>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Start building your business today with powerful tools,
              analytics, and real-time growth insights.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex-1 flex items-center justify-center px-6 py-16">

          <div className="w-full max-w-md">

            <h1
              className="text-7xl font-bold mb-2"
            // style={{ color: "var(--text-primary)" }}
            >
              Create an Account
            </h1>

            <p
              className="text-xxl mb-8"
            // style={{ color: "var(--text-secondary)" }}
            >
              Get started for free
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                // style={{ color: "var(--text-primary)" }}
                >
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl transition"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
              </div> */}

              {/* EMAIL */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                // style={{ color: "var(--text-primary)" }}
                >
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl transition"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                // style={{ color: "var(--text-primary)" }}
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 pr-12 rounded-xl transition"
                    style={{
                      background: "var(--surface-elevated)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)"
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-medium transition hover:opacity-90"
                style={{
                  background: "var(--accent)",
                  color: "var(--surface)"
                }}
              >
                Create Account
              </button>

            </form>
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="px-4 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="space-y-4">

              {/* GOOGLE */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition shadow-md"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign uP with Google
              </button>

              {/* TWITTER / X */}

            </div>
            <p className="mt-8 text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:opacity-70"
              >
                Sign in
              </Link>
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-white hover:underline"
              >
                ← Back to Home
              </button>
            </div>


          </div>

        </div>

      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
// import RollingCoinsSection from "./RollingCoinsSection";

export default function Landing() {
  const { user } = useAuth();
  const { dark, toggle } = useTheme();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const phrases = [
    "Rooted in Health.",
    "Guided by Purity.",
    "Built on Trust."
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === phrases.length) return;

    if (subIndex === phrases[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 40 : 80);

    setText(phrases[index].substring(0, subIndex));

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  const images = [
    "/Slide1.jpg",
    "/Slide2.jpg",
    "/Slide3.jpg",
    "/Slide4.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("active");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: "var(--surface)",
        backgroundImage: `
    linear-gradient(to right, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
    linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
  `,
        backgroundSize: "40px 40px"
      }}

    >

      {/* ================= NAVBAR ================= */}
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







      <section className="relative w-full overflow-hidden flex items-center justify-center py-16 sm:py-20 lg:min-h-[850px] reveal mt-10">

        {/* BACKGROUND */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-800 via-blue-600 to-sky-500" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-purple-600" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-900 via-green-700 to-emerald-500" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-rose-900 via-red-800 to-pink-600" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-700" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-900 via-amber-700 to-yellow-500" /> */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-500" /> */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-800 via-slate-600 to-slate-400" />
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]" /> */}

        {/* <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.35), transparent 60%)",
          }}
        /> */}

        <div
          className="absolute inset-0 z-20"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative Squares - Desktop Only */}
        <div className="hidden lg:block absolute z-30 w-[420px] h-[420px] bg-white/20 backdrop-blur-3xl rounded-[40px] rotate-12 left-[-100px] top-[220px] border border-white/30 shadow-[0_50px_120px_rgba(0,0,0,0.35)]" />

        <div className="hidden lg:block absolute z-30 w-[360px] h-[360px] bg-white/20 backdrop-blur-3xl rounded-[40px] -rotate-12 right-[-80px] top-[260px] border border-white/30 shadow-[0_50px_120px_rgba(0,0,0,0.35)]" />

        {/* CONTENT */}
        <div className="relative z-40 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center text-white">

          <p className="relative inline-block text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest uppercase mb-6">

            <span className="relative z-10 mt-7 ">
              welcome to LIfe Aim
            </span>

            <span className="star star-1"></span>  <span className="star star-4"></span>
          </p>


          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-8 sm:mb-10">

            <span className="block">
              Restore Balance with
            </span>

            <span className="block font-bold">
              Pure Ayurveda
            </span>

          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">



            <div className="block MT-5 lg:mt-0">
              <div
                className="relative rounded-2xl overflow-hidden 
               h-[240px] sm:h-[300px] md:h-[350px] lg:h-[380px] 
               w-full"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="flex h-full transition-transform duration-[1200ms] ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Preview"
                      className="w-full h-full object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>


          </div>
          {/* Sign In Button */}
          <div className="mb-4 mt-10">
            <Link
              to="/login"
              className="snake-btn inline-block px-6 py-3 text-sm font-semibold rounded-xl"
            >
              Sign In
            </Link>
          </div>
          {/* Email Input */}


          <div className="max-w-3xl -mt-4 text-center text-white py-10 px-6">

            <p className="text-2xl md:text-xl leading-relaxed text-white/90 mt-3">
              Our mission is to restore balance, boost vitality, and support natural healing.
            </p>

          </div>



        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent" />

      </section>


      {/* ================= HERO ================= */}
      <section className="flex-1 py-20 lg:py-28 ">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 xl:gap-32 items-center reveal" >
          {/* LEFT */}
          <div>
            <p className="text-2xl font-semibold tracking-[0.35em] uppercase mb-6 relative inline-block">



            </p>

            <h1
              className="text-7xl sm:text-6xl lg:text-7xl font-semibold leading-[1.15] mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {text}
              <span className="animate-pulse">|</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              A thoughtfully designed digital platform rooted in natural philosophy and timeless wellness traditions.
              We prioritize purity, transparency, and ethical standards ensuring every step reflects care,
              integrity, and long-term commitment to holistic living.
              <br /><br />
              Built with trust at its core, our system empowers individuals to grow confidently
              within a secure and value-driven environment.
            </p>


            <div className="flex flex-col sm:flex-row gap-4">
              {/* <Link
                to={user ? "/dashboard" : "/auth"}

                className="px-8 py-3 rounded-xl text-sm font-medium text-center shadow-sm transition-all duration-300 hover:opacity-90"
                style={{
                  background: "var(--accent)",
                  color: "white",
                }}
              >
                Get Started
              </Link> */}
              {/* <Link
                to="/login"
                className="relative inline-block px-8 py-3 text-sm font-semibold rounded-xl overflow-hidden text-black dark:text-white"
                style={{
                  background: "rgba(99, 102, 241, 0.08)",
                  backdropFilter: "blur(6px)",
                }}
              >
                Sign In

                <span className="absolute inset-0 rounded-xl pointer-events-none">
                  <span className="snake-border"></span>
                </span>
              </Link> */}




            </div>
          </div>






        </div>
      </section>





      {/* ================= AYURVEDIC FEATURE SECTION (REVERSED) ================= */}
      <section
        className="relative py-28 overflow-hidden reveal"
        style={{
          backgroundColor: "var(--surface)",
          backgroundImage: `
    linear-gradient(to right, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
    linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
  `,
          backgroundSize: "40px 40px"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 xl:gap-32 items-center" >

          {/* LEFT CARD MOCKUP */}
          <div className="relative order-2 lg:order-1">

            <div className="relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40 ">

              <h4 className="text-lg font-semibold mb-4 text-emerald-700">
                Ashwagandha Extract
              </h4>

              <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                <p className="text-3xl font-bold text-emerald-800">
                  Stress Relief Formula
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Clinically supported adaptogenic herb for
                  improved focus & immunity.
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Dosage</span>
                  <span>500mg Daily</span>
                </div>
                <div className="flex justify-between">
                  <span>Form</span>
                  <span>Capsules</span>
                </div>
                <div className="flex justify-between">
                  <span>Certification</span>
                  <span>100% Organic</span>
                </div>
              </div>

              <button className="mt-6 w-full py-3 rounded-xl bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-all">
                View Details
              </button>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-400/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full"></div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium tracking-widest text-emerald-600 uppercase">
              Natural Healing System
            </span>

            <h2
              className="text-4xl sm:text-5xl font-semibold tracking-tight mt-4 mb-6 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Experience the power of
              <br />
              authentic Ayurvedic wellness.
            </h2>

            <p
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Traditional herbal formulations combined with modern
              research to restore balance, strengthen immunity,
              and enhance long-term vitality.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-orange-600 text-white font-medium shadow-lg hover:shadow-emerald-500/40">
                Explore Products
              </button>

              <button className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-500">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TOP MEDICINE CATEGORIES ================= */}
      <section className="py-28 bg-[var(--surface)] reveal" style={{
        backgroundColor: "var(--surface)",
        backgroundImage: `
    linear-gradient(to right, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
    linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
  `,
        backgroundSize: "40px 40px"
      }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center">

          {/* Small Label */}
          <span className="text-sm tracking-widest uppercase text-emerald-600 font-medium">
            Our Categories
          </span>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl font-semibold mt-4 mb-6">
            We provide trusted Ayurvedic
            <br /> healing solutions
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-16">
            Natural, research-backed herbal formulations designed
            to restore balance and improve overall wellness.
          </p>

          {/* ===== TOP STATS ===== */}
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <div>
              <h3 className="text-4xl font-bold text-emerald-600">25k+</h3>
              <p className="text-gray-600 mt-2">Orders Delivered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-emerald-600">120+</h3>
              <p className="text-gray-600 mt-2">Herbal Formulations</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-emerald-600">98%</h3>
              <p className="text-gray-600 mt-2">Customer Satisfaction</p>
            </div>
          </div>

          {/* ===== CATEGORY CARDS ===== */}
          <div className="grid md:grid-cols-2 gap-10">

            {/* Herbal Supplements */}
            <div className="p-12 rounded-3xl bg-white shadow-xl border border-emerald-100 text-left">
              <h3 className="text-3xl font-semibold mb-6 text-emerald-700">
                Herbal Supplements
              </h3>

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>• Ashwagandha Capsules</li>
                <li>• Immunity Boosters</li>
                <li>• Digestive Support Powders</li>
                <li>• Stress Relief Formulas</li>
              </ul>

              <p className="mt-8 text-emerald-600 font-medium">
                Best Selling Category →
              </p>
            </div>

            {/* Premium Wellness Range */}
            <div className="p-12 rounded-3xl text-white bg-gradient-to-br from-emerald-600 to-teal-600 shadow-2xl text-left ">
              <h3 className="text-3xl font-semibold mb-6">
                Premium Wellness Range
              </h3>

              <ul className="space-y-3 text-sm opacity-90">
                <li>• Detox & Panchakarma Kits</li>
                <li>• Skin & Hair Care Oils</li>
                <li>• Ayurvedic Syrups</li>
                <li>• Joint & Bone Care Solutions</li>
              </ul>

              <p className="mt-8 font-medium">
                Top Rated Collection →
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= AYURVEDIC CATEGORIES ================= */}
      {/* ================= WHY CUSTOMERS GROW (2 ROW LAYOUT) ================= */}
      <section className="py-28 bg-[var(--surface)] reveal" style={{
        backgroundColor: "var(--surface)",
        backgroundImage: `
    linear-gradient(to right, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
    linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
  `,
        backgroundSize: "40px 40px"
      }}>
        <div className="max-w-7xl mx-auto px-8 lg:px-16">

          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-sm tracking-widest uppercase text-emerald-600 font-medium">
              Why Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-semibold mt-4">
              Why customers prefer our Ayurvedic solutions
            </h2>
          </div>

          {/* ===== ROW 1 ===== */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">

            {/* Card 1 */}
            <div className="p-10 rounded-3xl bg-white shadow-xl border border-emerald-100">
              <h3 className="text-6xl font-bold text-emerald-600 mb-4">
                18k+
              </h3>
              <p className="text-lg font-medium mb-2">
                Active Wellness Customers
              </p>
              <p className="text-sm text-gray-600">
                Thousands trust our herbal formulations for
                long-term health and immunity.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-10 rounded-3xl bg-white shadow-xl border border-emerald-100">
              <h3 className="text-xl font-semibold mb-4">
                Faster Natural Recovery
              </h3>

              <div className="flex items-center gap-6 text-emerald-600 text-3xl font-bold">
                1 Month → 3 Months
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Customers report noticeable improvement in
                energy, digestion, and sleep cycle.
              </p>
            </div>

          </div>

          {/* ===== ROW 2 (WIDE GRAPH CARD) ===== */}
          <div className="p-10 rounded-3xl bg-white shadow-xl border border-emerald-100">

            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Wellness Growth Overview
                </h3>
                <p className="text-sm text-gray-600">
                  Based on customer progress reports over 6 months
                </p>
              </div>

              <span className="text-2xl font-bold text-emerald-700">
                96% Positive Impact
              </span>
            </div>

            {/* Graph */}
            <div className="bg-emerald-50 p-6 rounded-2xl">
              <svg viewBox="0 0 600 200" className="w-full h-52">
                <defs>
                  <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area */}
                <path
                  d="M0 160 L100 130 L200 110 L300 90 L400 70 L500 50 L600 40 L600 200 L0 200 Z"
                  fill="url(#growthGradient)"
                />

                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4"
                  points="0,160 100,130 200,110 300,90 400,70 500,50 600,40"
                />
              </svg>
            </div>

          </div>

        </div>
      </section>

      <section className="relative py-20 overflow-hidden reveal">

        {/* GRID BACKGROUND */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundColor: "var(--surface)",
            backgroundImage: `
        linear-gradient(to right, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px),
        linear-gradient(to bottom, ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 grid lg:grid-cols-2 items-center gap-20">

          {/* ================= LEFT ORBIT ================= */}
          <div
            className="relative h-[460px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >

            {/* CENTER TEXT */}
            <div className="absolute text-center z-20">
              <h2 className={`text-4xl font-semibold ${dark ? "text-white" : "text-black"}`}>
                20k+
              </h2>
              <p className={`font-semibold mt-2 ${dark ? "text-white" : "text-black"}`}>
                Clients
              </p>
            </div>

            <div
              className="relative w-[260px] md:w-[350px] lg:w-[420px] h-[260px] md:h-[350px] lg:h-[420px]"
              style={{
                transform: "rotateX(35deg) rotateY(-10deg)",
                transformStyle: "preserve-3d",
              }}
            >

              {/* RINGS */}
              <div className={`absolute inset-0 border-2 rounded-full animate-spin-slow ${dark ? "border-white/40" : "border-black"}`} />
              <div className={`absolute inset-[70px] border-2 rounded-full animate-spin-reverse ${dark ? "border-white/40" : "border-black"}`} />
              <div className={`absolute inset-[140px] border-2 rounded-full animate-spin-slow ${dark ? "border-white/40" : "border-black"}`} />

              {/* AVATARS */}
              <div className="absolute inset-0 flex items-center justify-center">

                {/* OUTER */}
                <div className="absolute inset-0 animate-spin-slow">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const angle = (360 / 10) * i;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translate(210px) rotate(-${angle}deg)`
                        }}
                      >
                        <img
                          src={`https://i.pravatar.cc/80?img=${i + 1}`}
                          alt="avatar"
                          className="w-12 h-12 rounded-full border border-white shadow-lg object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* MIDDLE */}
                <div className="absolute inset-0 animate-spin-reverse">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (360 / 6) * i;
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`
                        }}
                      >
                        <img
                          src={`https://i.pravatar.cc/80?img=${i + 20}`}
                          alt="avatar"
                          className="w-10 h-10 rounded-full border border-white shadow-md object-cover"
                        />
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT TEXT ================= */}
          <div className={dark ? "text-white" : "text-black"}>

            <span className={`uppercase tracking-widest text-sm ${dark ? "text-white/60" : "text-black/60"}`}>
              Our Network
            </span>

            <h3 className="text-4xl font-semibold mt-6 leading-tight">
              Trusted by thousands of certified Ayurvedic specialists
            </h3>

            <p className={`mt-6 leading-relaxed max-w-lg ${dark ? "text-white/70" : "text-black/70"}`}>
              Our ecosystem connects herbal experts, wellness practitioners,
              and natural healthcare providers globally — building a transparent,
              ethical, and trusted Ayurvedic network.
            </p>

            <div className="mt-8 flex gap-4">

              <button
                className={`px-6 py-3 rounded-xl font-medium transition 
          ${dark ? "bg-white text-black hover:opacity-80" : "bg-black text-white hover:opacity-80"}`}
              >
                Explore Network
              </button>

              <button
                className={`px-6 py-3 rounded-xl font-medium transition border-2
          ${dark
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                  }`}
              >
                Learn More
              </button>

            </div>
          </div>

        </div>
      </section>



      {/* <RollingCoinsSection /> */}


      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">

          {/* Top Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 items-start">

            {/* Logo Section */}
            {/* Logo Section with Twinkle */}
            {/* Logo Section with Proper Sparkles */}
            <div className="md:col-span-1 flex justify-start">
              <div className="relative inline-flex items-center gap-3">

                {/* Stars */}
                <span className="star star-1"></span>
                <span className="star star-2"></span>
                <span className="star star-3"></span>
                <span className="star star-4"></span>
                <div className="logo-wrapper">
                  <img
                    src="/logo.png"
                    alt="Life Aim Logo"
                    className="logo-img"
                  />
                </div>


                <h3
                  className="text-2xl font-semibold relative z-10 life-aim-text"
                >
                  Life Aim
                </h3>

              </div>
            </div>



            {/* Solutions */}
            <div>
              <h4 className="font-medium mb-5 text-[var(--text-primary)]">
                Solutions
              </h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>Herbal Supplements</li>
                <li>Detox Programs</li>
                <li>Immunity Boosters</li>
                <li>Skin & Hair Care</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium mb-5 text-[var(--text-primary)]">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h4 className="font-medium mb-5 text-[var(--text-primary)]">
                Learn
              </h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>Blog</li>
                <li>Guides</li>
                <li>Wellness Tips</li>
                <li>Ayurveda Basics</li>
              </ul>
            </div>

            {/* Social */}
            <div className="text-center">
              <p
                className="text-sm mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Follow us on
              </p>

              <div className="flex justify-center gap-6">

                {/* Twitter */}
                <svg
                  className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.46 8.46 0 01-2.71 1.03A4.23 4.23 0 0015.5 4c-2.36 0-4.27 1.92-4.27 4.29 0 .34.03.67.1.98C7.69 9.1 4.07 7.13 1.64 4.16c-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.78 1.88 3.54a4.21 4.21 0 01-1.93-.54v.05c0 2.07 1.46 3.8 3.4 4.19a4.3 4.3 0 01-1.92.07c.54 1.69 2.11 2.92 3.97 2.96A8.49 8.49 0 012 19.54 11.98 11.98 0 008.29 21c7.55 0 11.68-6.27 11.68-11.71 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
                </svg>

                {/* LinkedIn */}
                <svg
                  className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.12 1.11 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.24 8.98h4.5V24H.24zM8.98 8.98h4.32v2.05h.06c.6-1.14 2.06-2.34 4.25-2.34 4.55 0 5.39 2.99 5.39 6.87V24h-4.5v-7.41c0-1.77-.03-4.05-2.47-4.05-2.48 0-2.86 1.94-2.86 3.93V24h-4.5z" />
                </svg>

                {/* Facebook */}
                <svg
                  className="w-5 h-5 cursor-pointer hover:opacity-70 transition"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.63 9.87v-6.99H7.9V12h2.47V9.8c0-2.44 1.45-3.8 3.67-3.8 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.57.75-1.57 1.52V12h2.67l-.43 2.88h-2.24v6.99A10 10 0 0022 12z" />
                </svg>

              </div>
            </div>



          </div>

          {/* Bottom */}
          <div className="border-t border-[var(--border)] mt-16 pt-6 text-center text-sm"
            style={{ color: "var(--text-primary)" }}>
            © 2026 Life Aim. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
}

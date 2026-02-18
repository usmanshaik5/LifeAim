import { useState, useEffect } from "react";
const useCounter = (target, active) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const duration = 4000; // 🔥 4 seconds (increase more if needed)
    const steps = duration / 20; // update every 20ms
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        start = target;
        clearInterval(timer);
      }

      setCount(start);
    }, 20);

    return () => clearInterval(timer);
  }, [target, active]);

  return count;
};

export default function Dashboard() {
  const [mobileTab, setMobileTab] = useState("home");
  const [openSection, setOpenSection] = useState(null);
  const wallet = useCounter(11318.22, mobileTab === "home");
  const selfBusiness = useCounter(26993.78, mobileTab === "home");
  const totalEarning = useCounter(14767.98, mobileTab === "home");

  const directBusiness = useCounter(53352.28, mobileTab === "income");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const Section = ({ id, title, children }) => (
    <div className="border-2 border-gray-400 rounded-2xl shadow-md overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center p-5 bg-gray-50"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${openSection === id ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ${openSection === id ? "max-h-[1000px] p-5" : "max-h-0"
          } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">

      {/* HEADER */}
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900">
          Ummar (LA100001)
        </h1>
        <p className="text-gray-500 text-sm">
          Change your thoughts. Change your life.
        </p>
      </div>

      {/* ================= DESKTOP ================= */}


      {/* ================= MOBILE ================= */}
      {/* ================= MOBILE ================= */}
      <div className="p-6 space-y-6 max-w-md mx-auto">


        {/* HOME TAB */}
        {mobileTab === "home" && (
          <>
            <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl">
              <p className="text-sm opacity-80">Wallet Balance</p>
              <h2 className="text-3xl font-bold mt-2">
                ₹ {wallet.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>

            </div>

            {/* ACCOUNT SUMMARY */}
            <div className="space-y-4">
              {[
                ["Self Business", `₹ ${selfBusiness.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
                ["Total Earning", `₹ ${totalEarning.toLocaleString(undefined, { minimumFractionDigits: 2 })}`],
              ]
                .map((row, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-4">
                    <p className="text-sm text-gray-600">{row[0]}</p>
                    <h3 className="font-bold">{row[1]}</h3>
                  </div>
                ))}
            </div>

            {/* ROYALTY + KYC */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 rounded-xl text-center">
                <p className="text-sm">Royalty</p>
                <p className="font-semibold">FAST-START</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <p className="text-sm">KYC</p>
                <p className="font-semibold">APPROVED</p>
              </div>
            </div>
          </>
        )}

        {/* BUSINESS TAB */}
        {mobileTab === "business" && (
          <>
            {/* TEAM MATRIX */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg mb-2">Team Matrix</h2>

              {[
                ["Total Team", "22 | 15", "bg-indigo-100 text-indigo-900"],
                ["Active Team", "0 | 0", "bg-green-100 text-green-900"],
                ["Inactive Team", "22 | 15", "bg-red-100 text-red-900"],
                ["Total Direct", "17 | 8", "bg-blue-100 text-blue-900"],
                ["Active Direct", "3 | 1", "bg-teal-100 text-teal-900"],
                ["Inactive Direct", "14 | 7", "bg-orange-100 text-orange-900"],
              ].map((row, i) => (
                <div
                  key={i}
                  className={`${row[2]} p-4 rounded-xl`}
                >
                  <p className="text-sm">{row[0]}</p>
                  <h3 className="font-semibold mt-1">{row[1]}</h3>
                </div>
              ))}
            </div>

            {/* BUSINESS */}
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-3">Business</h2>

              <div className="bg-gray-100 text-gray-900 p-5 rounded-xl">
                <p className="text-sm">Total Business</p>
                <h3 className="text-2xl font-bold mt-1">70324</h3>
              </div>
            </div>

            {/* TOTAL + AVAILABLE PV */}
            <div className="space-y-4 mt-6">
              <div className="bg-cyan-100 text-cyan-900 p-4 rounded-xl">
                <p className="text-sm">Total PV</p>
                <h3 className="font-semibold mt-1">1748 / 724</h3>
              </div>

              <div className="bg-violet-100 text-violet-900 p-4 rounded-xl">
                <p className="text-sm">Available PV</p>
                <h3 className="font-semibold mt-1">902 / 0</h3>
              </div>
            </div>
          </>
        )}

        {/* INCOME TAB */}
        {mobileTab === "income" && (
          <>
            <h2 className="font-semibold text-lg mb-4">Income Overview</h2>

            <div className="space-y-4">
              {[
                ["Matching Income", "₹ 579.60", "bg-indigo-100 text-indigo-900"],
                ["Sponsor Matching", "₹ 363.60", "bg-pink-100 text-pink-900"],
                ["Royalty Income", "₹ 3912.39", "bg-emerald-100 text-emerald-900"],
                ["FAST-START", "₹ 1296.00", "bg-orange-100 text-orange-900"],
                ["PRESIDENT", "₹ 1304.13", "bg-cyan-100 text-cyan-900"],
                ["Rank Reward", "₹ 6000.00", "bg-violet-100 text-violet-900"],
              ].map((row, i) => (
                <div
                  key={i}
                  className={`${row[2]} p-4 rounded-xl`}
                >
                  <p className="text-sm">{row[0]}</p>
                  <h3 className="font-semibold mt-1">{row[1]}</h3>
                </div>
              ))}
            </div>

            {/* WITHDRAW SECTION */}
            <div className="mt-8 space-y-4">
              <h2 className="font-semibold text-lg">Withdraw Overview</h2>

              <div className="bg-gray-100 text-gray-900 p-5 rounded-xl">
                <p className="text-sm text-gray-600">Direct Business</p>
                <h3 className="text-3xl font-bold mt-2">
                  ₹ {directBusiness.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
              </div>


              <div className="bg-green-100 text-green-900 p-4 rounded-xl">
                <p className="text-sm">Success Withdraw</p>
                <h3 className="font-semibold mt-1">₹ 0</h3>
              </div>

              <div className="bg-red-100 text-red-900 p-4 rounded-xl">
                <p className="text-sm">Pending Withdraw</p>
                <h3 className="font-semibold mt-1">₹ 0</h3>
              </div>
            </div>
          </>
        )}


        {/* PROFILE TAB */}
        {mobileTab === "profile" && (
          <div className="space-y-6">

            {/* PROFILE HEADER CARD */}
            <div className="bg-indigo-100 rounded-2xl p-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-600 text-white 
                      flex items-center justify-center text-2xl font-bold shadow-md">
                U
              </div>

              <h2 className="mt-3 font-semibold text-lg text-indigo-900">
                Demo User
              </h2>
              <p className="text-sm text-indigo-700">PRESIDENT</p>
            </div>

            {/* PROFILE DETAILS */}
            <div className="bg-white rounded-2xl shadow-sm border p-4 space-y-4">
              {[
                ["Date Joined", "27 Jan 2026"],
                ["Account Status", "ACTIVE"],
                ["Reward", "PRESIDENT"],
                ["Mobile", "9876543210"],
                ["Email", "demo@gmail.com"],
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{row[0]}</span>
                  <span className="font-semibold text-gray-900">{row[1]}</span>
                </div>
              ))}
            </div>

          </div>
        )}


        {/* REFERRALS TAB */}
        {mobileTab === "referrals" && (
          <div className="space-y-5">

            {[
              [
                "Left Referral",
                "https://worldlifecareMultitrade.com/register.aspx?Sponsor=LA100001&Side=Left",
                "bg-indigo-100 text-indigo-900",
              ],
              [
                "Right Referral",
                "https://worldlifecareMultitrade.com/register.aspx?Sponsor=LA100001&Side=Right",
                "bg-pink-100 text-pink-900",
              ],
            ].map((item, i) => (
              <div
                key={i}
                className={`${item[2]} p-4 rounded-xl relative`}
              >
                <p className="font-semibold mb-2">{item[0]}</p>

                <p className="text-sm break-all pr-20">
                  {item[1]}
                </p>

                {/* COPY BUTTON */}
                <button
                  onClick={() => navigator.clipboard.writeText(item[1])}
                  className="absolute bottom-4 right-4 
          bg-white text-gray-800 
          px-3 py-1 rounded-md 
          text-xs font-semibold
          border border-gray-200
          hover:bg-gray-50
          active:scale-95
          transition-all duration-200"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        )}



      </div>

      {/* MOBILE NAV */}
      {/* MOBILE NAV */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">

        <div className="flex justify-around items-center py-2">

          {[
            ["home", "Home"],
            ["business", "Business"],
            ["income", "Income"],
            ["profile", "Profile"],
            ["referrals", "Refer"],
          ].map((tab) => (
            <button
              key={tab[0]}
              onClick={() => setMobileTab(tab[0])}
              className="flex flex-col items-center flex-1 py-2 relative"
            >
              {/* ICONS */}
              {tab[0] === "home" && (
                <svg
                  className={`w-6 h-6 ${mobileTab === "home" ? "text-indigo-600" : "text-gray-400"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
                </svg>
              )}

              {tab[0] === "business" && (
                <svg
                  className={`w-6 h-6 ${mobileTab === "business" ? "text-indigo-600" : "text-gray-400"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h18v18H3V3z" />
                  <path d="M8 17V9M12 17V5M16 17v-7" />
                </svg>
              )}

              {tab[0] === "income" && (
                <svg
                  className={`w-6 h-6 ${mobileTab === "income" ? "text-indigo-600" : "text-gray-400"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1v22M17 5H9a4 4 0 000 8h6a4 4 0 010 8H7" />
                </svg>
              )}

              {tab[0] === "profile" && (
                <svg
                  className={`w-6 h-6 ${mobileTab === "profile" ? "text-indigo-600" : "text-gray-400"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0113 0" />
                </svg>
              )}

              {tab[0] === "referrals" && (
                <svg
                  className={`w-6 h-6 ${mobileTab === "referrals" ? "text-indigo-600" : "text-gray-400"
                    }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 14L21 3M21 3v7M21 3h-7" />
                  <path d="M14 10L3 21M3 21v-7M3 21h7" />
                </svg>
              )}

              {/* LABEL */}
              <span
                className={`text-xs mt-1 font-medium ${mobileTab === tab[0]
                  ? "text-indigo-600"
                  : "text-gray-500"
                  }`}
              >
                {tab[1]}
              </span>

              {/* ACTIVE INDICATOR */}
              {mobileTab === tab[0] && (
                <div className="absolute -bottom-1 w-8 h-1 bg-indigo-600 rounded-full"></div>
              )}
            </button>
          ))}

        </div>
      </div>


    </div>
  );
}

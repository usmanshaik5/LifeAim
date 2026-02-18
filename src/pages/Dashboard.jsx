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
      <div className="hidden md:block p-8 space-y-8">

        {/* WALLET */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl">
          <p className="text-sm opacity-80">Wallet Balance</p>
          <h2 className="text-4xl font-bold mt-2">₹ 11,318.22</h2>
        </div>

        {/* REFERRALS */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <h3 className="text-cyan-400 font-semibold mb-4">
              REFERRAL – LEFT
            </h3>
            <p className="text-sm break-all">
              https://worldlifecareMultitrade.com/register.aspx?Sponsor=LA100001&Side=Left
            </p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <h3 className="text-purple-400 font-semibold mb-4">
              REFERRAL – RIGHT
            </h3>
            <p className="text-sm break-all">
              https://worldlifecareMultitrade.com/register.aspx?Sponsor=LA100001&Side=Right
            </p>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Total Earnings", "₹ 14,767.98"],
            ["Self Business", "₹ 26,993.78"],
            ["Total Business", "70,324"],
          ].map((item, i) => (
            <div key={i} className="border rounded-xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">{item[0]}</p>
              <h3 className="text-xl font-bold mt-1">{item[1]}</h3>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
          <h2 className="text-lg font-semibold mb-6">ACCOUNT SUMMARY</h2>

          <div className="space-y-4">
            <div className="bg-indigo-600 rounded-xl p-5">
              <p>Wallet Balance</p>
              <h3 className="text-2xl font-bold">₹ 11318.22</h3>
            </div>

            <div className="bg-blue-600 rounded-xl p-5">
              <p>Self Business</p>
              <h3 className="text-2xl font-bold">₹ 26993.78</h3>
            </div>

            <div className="bg-green-600 rounded-xl p-5">
              <p>Total Earning</p>
              <h3 className="text-2xl font-bold">₹ 14767.98</h3>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-purple-900 text-white rounded-2xl p-6">
            <h3 className="mb-4 font-semibold">Royalty Status</h3>
            <div className="bg-purple-500 text-black px-4 py-2 rounded-full inline-block font-semibold">
              FAST-START-ROYALTY
            </div>
          </div>

          <div className="bg-green-900 text-white rounded-2xl p-6">
            <h3 className="mb-4 font-semibold">KYC Status</h3>
            <div className="bg-green-500 text-black px-4 py-2 rounded-full inline-block font-semibold">
              APPROVED
            </div>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">TEAM MATRIX</h2>

          <div className="space-y-3 text-sm">
            {[
              ["Total Team", "22", "15"],
              ["Active Team", "0", "0"],
              ["Inactive Team", "22", "15"],
              ["Total Direct", "17", "8"],
              ["Active Direct", "3", "1"],
              ["Inactive Direct", "14", "7"],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-slate-700 py-2">
                <span>{row[0]}</span>
                <span className="text-center">{row[1]}</span>
                <span className="text-center">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">BUSINESS</h2>

          <div className="text-center mb-6">
            <h3 className="text-4xl font-bold">70324</h3>
            <p className="text-gray-400">TOTAL BUSINESS</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <span>Left Side</span>
                <span>36129</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full mt-2">
                <div className="h-2 bg-cyan-500 rounded-full w-3/4"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Right Side</span>
                <span>34195</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full mt-2">
                <div className="h-2 bg-purple-500 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">WITHDRAW OVERVIEW</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-cyan-900 rounded-xl p-5 text-center">
              <p>Direct Business</p>
              <h3 className="text-2xl font-bold">₹ 53352.28</h3>
            </div>

            <div className="bg-green-900 rounded-xl p-5 text-center">
              <p>Success Withdraw</p>
              <h3 className="text-2xl font-bold">₹ 0</h3>
            </div>

            <div className="bg-yellow-900 rounded-xl p-5 text-center">
              <p>Pending Withdraw</p>
              <h3 className="text-2xl font-bold">₹ 0</h3>
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <Section id="profile" title="Profile Details">
          {[
            ["Date Joined", "27 Jan 2026"],
            ["Account Status", "ACTIVE"],
            ["Reward", "PRESIDENT"],
            ["Mobile", "9876543210"],
            ["Email", "demo@gmail.com"],
          ].map((row, i) => (
            <div key={i} className="flex justify-between py-2">
              <span>{row[0]}</span>
              <span className="font-semibold">{row[1]}</span>
            </div>
          ))}
        </Section>

        <Section id="income" title="Income Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["Matching Income", "₹ 579.60", "from-indigo-500 to-purple-500"],
              ["Sponsor Matching", "₹ 363.60", "from-pink-500 to-rose-500"],
              ["Royalty Income", "₹ 3912.39", "from-emerald-500 to-teal-500"],
              ["FAST-START", "₹ 1296.00", "from-orange-500 to-amber-500"],
              ["PRESIDENT", "₹ 1304.13", "from-cyan-500 to-blue-500"],
              ["Rank Reward", "₹ 6000.00", "from-violet-600 to-indigo-600"],
            ].map((row, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl text-white shadow-lg 
        bg-gradient-to-r ${row[2]} 
        transform transition-all duration-300 
        hover:scale-105 hover:shadow-2xl`}
              >
                <div className="text-sm opacity-90">{row[0]}</div>
                <div className="text-xl font-bold mt-1">{row[1]}</div>
              </div>
            ))}
          </div>
        </Section>

      </div>

      {/* ================= MOBILE ================= */}
      {/* ================= MOBILE ================= */}
      <div className="md:hidden p-6 space-y-6">

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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden">
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

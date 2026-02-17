import { mockWithdrawals } from "../data/mock";
import { useState, useRef, useEffect } from "react";

export default function Wallet() {


  const [payOpen, setPayOpen] = useState(false);
  const [payMode, setPayMode] = useState("");
  const payRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (payRef.current && !payRef.current.contains(e.target)) {
        setPayOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="space-y-12">

      {/* ================= FUND REQUEST ================= */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
          Fund Request
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Member ID
            </label>
            <input
              type="text"
              value="LA100001"
              readOnly
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Amount (INR)*
            </label>
            <input
              type="number"
              placeholder="Enter Fund Amount in INR"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div className="relative" ref={payRef}>
            <label
              className="text-sm font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Payment Mode
            </label>

            {/* Input Box */}
            <div
              onClick={() => setPayOpen(!payOpen)}
              className="mt-2 px-4 py-3 rounded-xl cursor-pointer
               bg-white dark:bg-white/5
               border border-gray-300 dark:border-white/10
               flex justify-between items-center
               hover:border-indigo-400
               transition-all duration-200"
            >
              <span className={payMode ? "text-gray-700 dark:text-gray-200" : "text-gray-400"}>
                {payMode || "Select Payment Mode"}
              </span>

              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${payOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Animated Dropdown */}
            <div
              className={`absolute left-0 right-0 mt-2 rounded-xl
                bg-white dark:bg-[#1e293b]
                border border-gray-200 dark:border-white/10
                shadow-lg overflow-hidden
                transition-all duration-300 origin-top
                ${payOpen
                  ? "opacity-100 scale-y-100"
                  : "opacity-0 scale-y-95 pointer-events-none"
                }`}
            >
              {["UPI", "Bank Transfer"].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setPayMode(option);
                    setPayOpen(false);
                  }}
                  className="px-4 py-3 cursor-pointer
                   hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                   transition"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>



          <div>
            <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Transaction ID
            </label>
            <input
              type="text"
              placeholder="Enter Transaction Number"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition">
          Request for Payment
        </button>
      </section>



      {/* ================= FUND TRANSFER ================= */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-primary)" }}>
          Fund Transfer
        </h2>

        <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 px-6 py-4 rounded-xl border border-gray-200 dark:border-white/10">
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            Available Fund
          </span>
          <span className="text-2xl font-bold text-indigo-600">
            ₹11,318.22
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Enter Transfer Member ID"
            className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="number"
            placeholder="Enter Transfer Fund Amount"
            className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Enter Transaction Password"
            className="px-4 py-3 rounded-xl md:col-span-2 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-semibold transition">
          Transfer
        </button>
      </section>


      {/* ================= FUND STATUS ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Fund Status
        </h2>

        <div className="glass-subtle rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Username</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Payment Mode</th>
                <th className="px-6 py-4 text-left">TXID</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockWithdrawals.map((w, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">LA100001</td>
                  <td className="px-6 py-4">{w.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${w.status === "Completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">UPI</td>
                  <td className="px-6 py-4">123ABC</td>
                  <td className="px-6 py-4">{w.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      {/* ================= WALLET STATEMENT ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Wallet Statement
        </h2>

        <div className="glass-subtle rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Particular</th>
                <th className="px-6 py-4 text-left">Credit</th>
                <th className="px-6 py-4 text-left">Debit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">14/02/2026</td>
                <td className="px-6 py-4">Deposit by Admin</td>
                <td className="px-6 py-4 text-green-500">10000.00</td>
                <td className="px-6 py-4">0.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4">2</td>
                <td className="px-6 py-4">12/02/2026</td>
                <td className="px-6 py-4">Product Purchase</td>
                <td className="px-6 py-4">0.00</td>
                <td className="px-6 py-4 text-red-400">538.10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

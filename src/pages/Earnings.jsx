import { mockEarnings } from "../data/mock";

const IncomeSection = ({ title }) => {
  return (
    <div className="glass-subtle rounded-2xl p-6 sm:p-8">
      <h2
        className="text-lg sm:text-xl font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>

      {/* Date Filters */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end mb-6">
        <div className="flex flex-col">
          <label
            className="text-xs mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            Select From Date
          </label>
          <input
            type="date"
            className="glass-subtle px-3 py-2 rounded-lg text-sm outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            className="text-xs mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            Select To Date
          </label>
          <input
            type="date"
            className="glass-subtle px-3 py-2 rounded-lg text-sm outline-none"
          />
        </div>

        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              className="text-left border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">Username</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Particular</th>
              <th className="py-3 px-2">Credit</th>
              <th className="py-3 px-2">Debit</th>
            </tr>
          </thead>

          <tbody>
            <tr
              className="border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <td className="py-3 px-2">1</td>
              <td className="py-3 px-2">LA100001</td>
              <td className="py-3 px-2">1/31/2026</td>
              <td className="py-3 px-2">Monthly Income</td>
              <td className="py-3 px-2 font-semibold text-green-500">
                0.00
              </td>
              <td className="py-3 px-2">0.00</td>
            </tr>

            <tr>
              <td colSpan="4" className="py-3 px-2 text-right font-semibold">
                Total
              </td>
              <td className="py-3 px-2 font-bold text-green-500">0.00</td>
              <td className="py-3 px-2">0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Earnings() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="relative pb-6 border-b border-[var(--border-color)]">

        {/* Small Label */}
        <span className="text-xs uppercase tracking-widest text-blue-500 font-semibold">
          Financial Overview
        </span>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mt-2 text-[var(--text-primary)]">
          Earnings Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-sm mt-3 max-w-xl text-[var(--text-muted)]">
          Monitor and analyze all your income streams including binary,
          sponsor, royalty, and bonus earnings in one place.
        </p>


      </div>


      {/* Total Earnings Card */}



      {/* Small Summary Cards */}


      {/* Income Sections */}
      <IncomeSection title="Matching Binary Income" />
      <IncomeSection title="Sponsor Matching Income" />
      <IncomeSection title="Royalty-1 Income" />
      <IncomeSection title="Fast-Start Royalty Income" />
      <IncomeSection title="President Royalty Income" />
      <IncomeSection title="Nominee Fund" />
    </div>
  );
}

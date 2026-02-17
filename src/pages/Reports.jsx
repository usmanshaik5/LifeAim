import { useState } from "react";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("royalty");

  const royaltyData = [
    { sn: 1, member: "LA100001", royalty: "FAST-START-ROYALTY", remark: "FAST-START-ROYALTY ACHIEVED", percentage: 2, date: "16/02/2026" },
    { sn: 2, member: "LA100001", royalty: "ROYALTY-1", remark: "ROYALTY-1 ACHIEVED", percentage: 3, date: "27/01/2026" },
  ];

  const rankData = [
    { sn: 1, member: "LA100001", reward: "ASSOCIATE", remark: "ASSOCIATE ACHIEVED", date: "27/01/2026" },
    { sn: 2, member: "LA100001", reward: "DISTRIBUTOR", remark: "DISTRIBUTOR ACHIEVED", date: "27/01/2026" },
  ];

  const matchingData = [
    { sn: 1, username: "LA100001", amount: 26.88, paid: 537.6, lapse: 0, remark: "BINARY INCOME", date: "16/02/2026" },
    { sn: 2, username: "LA100001", amount: 30.0, paid: 30.0, lapse: 0, remark: "BINARY INCOME", date: "31/01/2026" },
  ];

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === id
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        }`}
    >
      {label}
    </button>
  );

  const DateInput = () => (
    <input
      type="text"
      placeholder="dd-mm-yyyy"
      onFocus={(e) => (e.target.type = "date")}
      onBlur={(e) => {
        if (!e.target.value) e.target.type = "text";
      }}
      className="px-4 py-2 rounded-lg border 
      dark:bg-gray-800 dark:border-gray-700
      placeholder-gray-400 dark:placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />
  );

  const FilterSection = () => (
    <div className="flex flex-wrap items-end gap-6 mb-6">

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
          FROM DATE
        </label>
        <input
          type="date"
          className="w-52 px-4 py-2 rounded-lg border 
        dark:bg-gray-800 dark:border-gray-700
        text-gray-700 dark:text-gray-200
        focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
          TO DATE
        </label>
        <input
          type="date"
          className="w-52 px-4 py-2 rounded-lg border 
        dark:bg-gray-800 dark:border-gray-700
        text-gray-700 dark:text-gray-200
        focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button className="px-8 py-2 rounded-lg bg-blue-600 text-white font-medium hover:opacity-90 transition">
        Search
      </button>

    </div>
  );



  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* Tabs */}
      <div className="flex gap-3">
        <TabButton id="royalty" label="Royalty Report" />
        <TabButton id="rank" label="Rank Report" />
        <TabButton id="matching" label="Matching Report" />
      </div>

      <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 shadow-sm">

        <FilterSection />

        {/* ROYALTY TABLE */}
        {activeTab === "royalty" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">SN.</th>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Royalty</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Percentage</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {royaltyData.map((r) => (
                  <tr key={r.sn} className="border-t dark:border-gray-800">
                    <td className="px-4 py-3">{r.sn}</td>
                    <td className="px-4 py-3">{r.member}</td>
                    <td className="px-4 py-3">{r.royalty}</td>
                    <td className="px-4 py-3">{r.remark}</td>
                    <td className="px-4 py-3">{r.percentage}%</td>
                    <td className="px-4 py-3">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* RANK TABLE */}
        {activeTab === "rank" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">SN.</th>
                  <th className="px-4 py-3">Member</th>
                  <th className="px-4 py-3">Reward</th>
                  <th className="px-4 py-3">Recognition Remark</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {rankData.map((r) => (
                  <tr key={r.sn} className="border-t dark:border-gray-800">
                    <td className="px-4 py-3">{r.sn}</td>
                    <td className="px-4 py-3">{r.member}</td>
                    <td className="px-4 py-3">{r.reward}</td>
                    <td className="px-4 py-3">{r.remark}</td>
                    <td className="px-4 py-3">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MATCHING TABLE */}
        {activeTab === "matching" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3">SN.</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Lapse</th>
                  <th className="px-4 py-3">Remark</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {matchingData.map((r) => (
                  <tr key={r.sn} className="border-t dark:border-gray-800">
                    <td className="px-4 py-3">{r.sn}</td>
                    <td className="px-4 py-3">{r.username}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.paid}</td>
                    <td className="px-4 py-3">{r.lapse}</td>
                    <td className="px-4 py-3">{r.remark}</td>
                    <td className="px-4 py-3">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

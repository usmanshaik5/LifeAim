export const mockStats = [
  { label: "Total Balance", value: "$12,450.00", change: "+12.5%" },
  { label: "Total Earnings", value: "$8,320.00", change: "+8.2%" },
  { label: "Total Withdrawn", value: "$4,130.00", change: "+3.1%" },
  { label: "Pending", value: "$520.00", change: "-2.4%" },
];

export const mockEarnings = [
  { label: "Direct Referral", value: "$1,200.00" },
  { label: "Level Bonus", value: "$850.00" },
  { label: "Team Bonus", value: "$2,100.00" },
  { label: "Leadership Bonus", value: "$1,500.00" },
  { label: "Matching Bonus", value: "$670.00" },
  { label: "Royalty Income", value: "$2,000.00" },
];

export const mockTeam = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", level: 1, status: "Active", earnings: "$320" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", level: 1, status: "Active", earnings: "$210" },
  { id: 3, name: "Carol White", email: "carol@example.com", level: 2, status: "Pending", earnings: "$0" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", level: 2, status: "Active", earnings: "$150" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", level: 3, status: "Active", earnings: "$90" },
];

export const mockWithdrawals = [
  { id: 1, date: "2026-02-10", amount: "$500.00", method: "Bank Transfer", status: "Completed" },
  { id: 2, date: "2026-02-08", amount: "$250.00", method: "Crypto Wallet", status: "Pending" },
  { id: 3, date: "2026-02-05", amount: "$1,000.00", method: "Bank Transfer", status: "Completed" },
];

export const mockReferrals = [
  { label: "Your Referral Link", value: "https://app.example.com/ref/johndoe" },
  { label: "Total Referrals", value: "24" },
  { label: "Active Referrals", value: "18" },
  { label: "This Month", value: "5" },
];

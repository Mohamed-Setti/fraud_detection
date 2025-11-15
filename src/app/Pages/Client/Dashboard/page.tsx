'use client';

//import Image from "next/image";

export default function ClientDashboard() {
  // Dummy data
  const summary = [
    { title: "Total Transactions", value: "$12,450" },
    { title: "Suspicious Transactions", value: "24" },
    { title: "Alerts Triggered", value: "7" },
    { title: "Account Balance", value: "$48,200" },
  ];

  const recentTransactions = [
    { date: "2025-11-15", id: "TXN123456", amount: "$1,200", type: "Deposit", status: "Normal" },
    { date: "2025-11-14", id: "TXN123457", amount: "$500", type: "Withdrawal", status: "Suspicious" },
    { date: "2025-11-13", id: "TXN123458", amount: "$2,300", type: "Deposit", status: "Normal" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-10">FinGuard AI</div>
        <nav className="flex-1 space-y-4">
          <a href="#" className="block p-2 rounded hover:bg-blue-800">Dashboard</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-800">Transactions</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-800">Alerts</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-800">Reports</a>
          <a href="#" className="block p-2 rounded hover:bg-blue-800">Settings</a>
        </nav>
        <button className="mt-auto p-2 bg-red-600 rounded hover:bg-red-500">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-gray-900">John Doe</span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {summary.map((card) => (
            <div key={card.title} className="p-6 bg-white rounded-lg shadow">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 text-gray-800">
          <div className="p-6 bg-white rounded-lg shadow h-64 flex items-center justify-center">
            Line Chart Placeholder
          </div>
          <div className="p-6 bg-white rounded-lg shadow h-64 flex items-center justify-center">
            Bar Chart Placeholder
          </div>
          <div className="p-6 bg-white rounded-lg shadow h-64 flex items-center justify-center">
            Pie Chart Placeholder
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="p-6 bg-white rounded-lg shadow text-black">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Transaction ID</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{txn.date}</td>
                    <td className="py-2 px-3">{txn.id}</td>
                    <td className="py-2 px-3">{txn.amount}</td>
                    <td className="py-2 px-3">{txn.type}</td>
                    <td className={`py-2 px-3 font-semibold ${txn.status === "Suspicious" ? "text-red-600" : "text-green-600"}`}>
                      {txn.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}

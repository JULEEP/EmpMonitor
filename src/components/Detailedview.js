import React, { useState, useEffect } from "react";

const dummyData = {
  applications: [
    { user: "John", name: "Visual Studio Code", timeLogged: "4h 30m", productivityScore: 85, date: "2025-04-03", status: "Active" },
    { user: "Jane", name: "Slack", timeLogged: "2h 15m", productivityScore: 70, date: "2025-04-02", status: "Idle" },
    { user: "Bob", name: "Figma", timeLogged: "3h 10m", productivityScore: 80, date: "2025-04-03", status: "Active" },
    { user: "Alice", name: "Notion", timeLogged: "1h 45m", productivityScore: 75, date: "2025-03-31", status: "Offline" },
    { user: "Mike", name: "Postman", timeLogged: "2h 00m", productivityScore: 78, date: "2025-04-01", status: "Active" },
    { user: "Sara", name: "Jira", timeLogged: "1h 30m", productivityScore: 82, date: "2025-04-03", status: "Active" },
  ],
  websites: [
    { user: "John", name: "Stack Overflow", timeLogged: "1h 20m", productivityScore: 90, date: "2025-04-03", status: "Active" },
    { user: "Jane", name: "YouTube", timeLogged: "45m", productivityScore: 30, date: "2025-04-02", status: "Idle" },
    { user: "Bob", name: "MDN Web Docs", timeLogged: "1h 10m", productivityScore: 88, date: "2025-04-03", status: "Active" },
    { user: "Alice", name: "Reddit", timeLogged: "30m", productivityScore: 25, date: "2025-03-30", status: "Offline" },
    { user: "Mike", name: "GitHub", timeLogged: "2h 20m", productivityScore: 85, date: "2025-04-01", status: "Active" },
    { user: "Sara", name: "LinkedIn", timeLogged: "40m", productivityScore: 65, date: "2025-04-02", status: "Idle" },
  ],
};

export default function RealTimeEmployeeMonitoring() {
  const [branch, setBranch] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [tab, setTab] = useState("all");
  const [dateRange, setDateRange] = useState("day");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([...dummyData.applications, ...dummyData.websites]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setFilteredData(prevData => prevData.map(item => ({
          ...item,
          timeLogged: item.status === "Active" 
            ? `${parseInt(item.timeLogged.split("h")[0]) + Math.floor(Math.random() * 2)}h ${item.timeLogged.split(" ")[1]}`
            : item.timeLogged,
          productivityScore: item.status === "Active" 
            ? Math.min(100, item.productivityScore + (Math.random() > 0.5 ? 1 : -1)) 
            : item.productivityScore,
        })));
      }, 5000); // Update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const dataToShow = tab === "all" 
    ? [...dummyData.applications, ...dummyData.websites]
    : tab === "applications" 
    ? dummyData.applications 
    : dummyData.websites;

  const handleApplyFilters = () => {
    let filtered = [...dataToShow];

    if (branch) filtered = filtered.filter(item => item.branch?.toLowerCase().includes(branch.toLowerCase()));
    if (role) filtered = filtered.filter(item => item.role?.toLowerCase().includes(role.toLowerCase()));
    if (user) filtered = filtered.filter(item => item.user.toLowerCase().includes(user.toLowerCase()));
    if (search) filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.user.toLowerCase().includes(search.toLowerCase())
    );

    if (dateRange === "week") {
      const selected = new Date(selectedDate);
      const startOfWeek = new Date(selected.setDate(selected.getDate() - selected.getDay()));
      const endOfWeek = new Date(selected.setDate(selected.getDate() + 6));
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });
    } else if (dateRange === "range" && startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  };

  const getBarColor = (score) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-600";
  };

  const getStatusColor = (status) => {
    if (status === "Active") return "text-green-600";
    if (status === "Idle") return "text-orange-500";
    return "text-red-600";
  };

  const handleSoundSearch = () => {
    console.log("Sound search activated");
    // Implement voice search logic here
  };

  // Calculate summary stats
  const summary = {
    activeUsers: filteredData.filter(item => item.status === "Active").length,
    avgProductivity: Math.round(filteredData.reduce((sum, item) => sum + item.productivityScore, 0) / filteredData.length) || 0,
    totalTime: filteredData.reduce((sum, item) => {
      const [hours, minutes] = item.timeLogged.split("h ");
      return sum + parseInt(hours) * 60 + parseInt(minutes);
    }, 0),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Real-Time Employee Monitoring</h1>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded text-white ${isMonitoring ? "bg-red-600" : "bg-green-600"}`}
          >
            {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
          </button>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
            <p className="text-2xl font-bold text-green-600">{summary.activeUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Avg Productivity</h3>
            <p className="text-2xl font-bold text-blue-600">{summary.avgProductivity}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Time Logged</h3>
            <p className="text-2xl font-bold text-purple-600">
              {Math.floor(summary.totalTime / 60)}h {summary.totalTime % 60}m
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Filters */}
            <div className="flex gap-3 items-center">
              <input
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="border rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="border rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyFilters}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>

            {/* Calendar */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Date Range and Search */}
            <div className="flex gap-3 items-center">
              {["day", "week", "range"].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-2 rounded text-sm ${
                    dateRange === range ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500 hover:text-white transition`}
                  onClick={() => setDateRange(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
              {dateRange === "range" && (
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              <div className="flex items-center">
                <input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded px-3 py-2 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSoundSearch}
                  className="ml-2 bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
                  title="Voice Search"
                >
                  🎤
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          {["All", "Applications", "Websites"].map((t) => (
            <button
              key={t}
              className={`px-6 py-2 rounded-lg font-medium ${
                tab === t.toLowerCase() ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition`}
              onClick={() => {
                setTab(t.toLowerCase());
                setFilteredData(t === "All" ? [...dummyData.applications, ...dummyData.websites] : dummyData[t.toLowerCase()]);
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left text-gray-700 font-semibold">User</th>
                  <th className="p-3 text-left text-gray-700 font-semibold">
                    {tab === "all" ? "Apps & Websites" : tab === "applications" ? "Application" : "Website"}
                  </th>
                  <th className="p-3 text-left text-gray-700 font-semibold">Time Logged</th>
                  <th className="p-3 text-left text-gray-700 font-semibold">Productivity</th>
                  <th className="p-3 text-left text-gray-700 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-t">{item.user}</td>
                    <td className="p-3 border-t">{item.name}</td>
                    <td className="p-3 border-t">{item.timeLogged}</td>
                    <td className="p-3 border-t w-1/4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded h-5">
                          <div
                            className={`${getBarColor(item.productivityScore)} h-5 rounded`}
                            style={{ width: `${item.productivityScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm font-medium">{item.productivityScore}%</span>
                      </div>
                    </td>
                    <td className={`p-3 border-t font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
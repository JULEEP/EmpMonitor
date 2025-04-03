import React, { useState } from "react";
import {
  FiClock,
  FiSearch,
  FiSettings,
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiVideo,
  FiDownload,
  FiMaximize,
} from "react-icons/fi";

const ScreenshotsGrid = () => {
  // State for storing user data
  const [users] = useState([
    { id: 1, name: "A Rami", color: "bg-red-500", avatarText: "AR" },
    { id: 2, name: "Aditi S", color: "bg-orange-500", avatarText: "AS" },
    { id: 3, name: "Anoop K", color: "bg-blue-500", avatarText: "AK" },
    {
      id: 4,
      name: "Charlie Johnson",
      color: "bg-purple-500",
      avatarText: "CJ",
    },
    { id: 5, name: "David Linsec", color: "bg-green-500", avatarText: "DL" },
    { id: 6, name: "Ian Corby", color: "bg-pink-500", avatarText: "IC" },
    { id: 7, name: "Kristina Kumar", color: "bg-teal-500", avatarText: "KK" },
    { id: 8, name: "Laria Farr", color: "bg-yellow-500", avatarText: "LF" },
    { id: 9, name: "Malik Khan", color: "bg-indigo-500", avatarText: "MK" },
    { id: 10, name: "Neha Powell", color: "bg-emerald-500", avatarText: "NP" },
    { id: 11, name: "Naveen Kumar", color: "bg-cyan-500", avatarText: "NK" },
    { id: 12, name: "Sami Nadeem", color: "bg-gray-500", avatarText: "SN" },
  ]);

  // Function to generate dates for the current week
  const generateWeekDates = () => {
    const dates = [];
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const monday = new Date(today);
    monday.setDate(today.getDate() - diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // State for storing dates
  const [dates] = useState(generateWeekDates());

  // Format date to display (e.g., "25-Apr-2021")
  const formatDate = (date) => {
    return `${date.getDate()}-${date.toLocaleString("default", {
      month: "short",
    })}-${date.getFullYear()}`;
  };

  // Generate random screenshot data for each user and date
  const generateScreenshotData = () => {
    const entries = {};

    users.forEach((user) => {
      entries[user.id] = {};
      dates.forEach((date) => {
        const dateKey = formatDate(date);
        const randomCount = Math.floor(Math.random() * 5); // 0-4 screenshots
        const hasVideo = Math.random() > 0.7; // 30% chance of having a video

        entries[user.id][dateKey] = {
          count: randomCount,
          hasVideo,
          screenshots: Array(randomCount)
            .fill(null)
            .map((_, i) => ({
              id: `${user.id}-${dateKey}-${i}`,
              time: `${Math.floor(Math.random() * 24)}:${Math.floor(
                Math.random() * 60
              )
                .toString()
                .padStart(2, "0")}`,
              type: Math.random() > 0.8 ? "video" : "image", // 20% chance of being a video
            })),
        };
      });
    });

    return entries;
  };

  // State for storing screenshot data
  const [screenshotData] = useState(generateScreenshotData());

  // State for week navigation and filters
  const [weekOffset, setWeekOffset] = useState(0);
  const [weekNumber] = useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now - start;
    const oneWeek = 604800000;
    return Math.ceil(
      (diff + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60000) /
        oneWeek
    );
  });

  // State for filters
  const [filters, setFilters] = useState({
    branch: "all",
    role: "all",
    unit: "all",
  });

  // State for view mode (day/week)
  const [view, setView] = useState("week");

  // State for modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Render a screenshot cell
  const renderScreenshotCell = (userId, date) => {
    const dateKey = formatDate(date);
    const entry = screenshotData[userId][dateKey];

    if (!entry || entry.count === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
          no screenshots
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="text-xs text-gray-500 mb-1">
          {entry.count} {entry.count === 1 ? "screenshot" : "screenshots"}
          {entry.hasVideo && (
            <span className="ml-1 text-blue-500">
              <FiVideo className="inline" size={12} />
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1">
          {entry.screenshots.slice(0, 4).map((screenshot) => (
            <div
              key={screenshot.id}
              className="relative aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer hover:opacity-90"
              onClick={() => {
                setSelectedScreenshot({
                  user: users.find((u) => u.id === userId),
                  date: dateKey,
                  ...screenshot,
                });
                setModalOpen(true);
              }}
            >
              {screenshot.type === "video" ? (
                <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500">
                  <FiVideo size={16} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500">
                  <FiImage size={16} />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-0.5 text-center truncate">
                {screenshot.time}
              </div>
              {screenshot.type === "video" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white p-0.5 rounded-bl text-xs">
                  <FiVideo size={10} />
                </div>
              )}
            </div>
          ))}
          {entry.count > 4 && (
            <div className="relative aspect-square bg-gray-100 rounded overflow-hidden flex items-center justify-center text-gray-500 text-xs">
              +{entry.count - 4} more
            </div>
          )}
        </div>
      </div>
    );
  };

  // Navigate between weeks
  const navigateWeek = (offset) => {
    setWeekOffset((prevOffset) => prevOffset + offset);
  };

  // Render user avatar
  const renderAvatar = (user) => {
    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${user.color}`}
      >
        {user.avatarText}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-gray-800">
      {/* Header section with logo, search, and user controls */}
      <div className="flex items-center justify-between bg-blue-600 text-white p-3 shadow-md">
        <div className="flex items-center font-bold text-lg">
          <span className="mr-1">
            <FiClock size={20} />
          </span>
          <span>TIMECHAMP</span>
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Start here"
            className="w-full py-2 pl-8 pr-4 rounded-full border-none bg-white/20 text-white placeholder-white/60 outline-none"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70">
            <FiSearch size={16} />
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer opacity-80 hover:opacity-100">
            <FiSettings size={18} />
          </span>
          <span className="cursor-pointer opacity-80 hover:opacity-100">
            <FiBell size={18} />
          </span>
          <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
            U
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex overflow-x-auto bg-white border-b border-gray-200 whitespace-nowrap">
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 flex items-center text-gray-500 mr-2">
          <FiChevronLeft className="mr-1" /> Back
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Summary
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Timesheet
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Productivity
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Timeline
        </button>
        <button className="px-4 py-3 border-b-2 border-blue-600 text-blue-600 font-medium">
          Screenshots
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Detailed View
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Reports
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          My Dashboard
        </button>
        <button className="px-4 py-3 border-b-2 border-transparent hover:border-gray-300 text-gray-500">
          Team
        </button>
      </div>

      {/* Date and filter controls */}
      <div className="flex justify-between p-4 bg-white border-b border-gray-200 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100"
            onClick={() => navigateWeek(-1)}
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="mx-2 font-medium text-gray-700">
            Apr - 2021 W{weekNumber + weekOffset}
          </span>
          <button
            className="w-8 h-8 rounded border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100"
            onClick={() => navigateWeek(1)}
          >
            <FiChevronRight size={16} />
          </button>

          <div className="flex ml-4">
            <button
              className={`px-3 py-1 border border-gray-300 rounded-l-md text-sm ${
                view === "day"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => setView("day")}
            >
              Day
            </button>
            <button
              className={`px-3 py-1 border border-gray-300 border-l-0 rounded-r-md text-sm ${
                view === "week"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-500"
              }`}
              onClick={() => setView("week")}
            >
              Week
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <label className="text-sm text-gray-500">Branch:</label>
            <select
              value={filters.branch}
              onChange={(e) =>
                setFilters({ ...filters, branch: e.target.value })
              }
              className="p-1 border border-gray-300 rounded text-sm text-gray-700 bg-white"
            >
              <option value="all">All</option>
              <option value="main">Main</option>
              <option value="dev">Development</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <label className="text-sm text-gray-500">Role:</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="p-1 border border-gray-300 rounded text-sm text-gray-700 bg-white"
            >
              <option value="all">All</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <label className="text-sm text-gray-500">Unit:</label>
            <select
              value={filters.unit}
              onChange={(e) => setFilters({ ...filters, unit: e.target.value })}
              className="p-1 border border-gray-300 rounded text-sm text-gray-700 bg-white"
            >
              <option value="all">All</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main screenshots grid */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="flex sticky top-0 bg-white z-10 shadow-sm">
          <div className="w-44 p-2 font-semibold text-gray-500 border-r border-b border-gray-200 flex-shrink-0">
            User
          </div>
          {dates.map((date, index) => (
            <div
              key={index}
              className="w-36 p-2 font-semibold text-gray-500 text-center border-r border-b border-gray-200 flex-shrink-0"
            >
              {formatDate(date)}
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex border-b border-gray-200 hover:bg-slate-50"
            >
              <div className="w-44 p-2 flex items-center gap-3 border-r border-gray-200 flex-shrink-0">
                {renderAvatar(user)}
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>

              {dates.map((date, index) => (
                <div
                  key={index}
                  className="w-36 p-2 border-r border-gray-200 flex-shrink-0"
                >
                  {renderScreenshotCell(user.id, date)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer with export button */}
      <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wide">
          WEEKLY SCREENSHOTS REPORTS
        </div>
        <button className="px-4 py-2 bg-white text-blue-800 font-semibold rounded hover:bg-gray-100 transition-colors">
          Export
        </button>
      </div>

      {/* Screenshot Modal */}
      {modalOpen && selectedScreenshot && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {selectedScreenshot.user.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedScreenshot.date} at {selectedScreenshot.time}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <FiDownload size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <FiMaximize size={18} />
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100 p-8">
              {selectedScreenshot.type === "video" ? (
                <div className="w-full aspect-video bg-blue-50 flex items-center justify-center text-blue-500">
                  <div className="text-center">
                    <FiVideo size={48} className="mx-auto mb-4" />
                    <p>Video Recording</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedScreenshot.time}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FiImage size={48} className="mx-auto mb-4" />
                    <p>Screenshot</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedScreenshot.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {selectedScreenshot.type === "video"
                  ? "Video recording"
                  : "Screenshot"}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                  Flag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsGrid;

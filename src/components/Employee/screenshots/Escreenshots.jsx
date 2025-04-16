/**
 * Screenshot.jsx
 *
 * This component renders a screenshot monitoring interface for tracking work activity.
 * It displays a collection of screenshots with their associated metadata like project,
 * timestamp, and status. The interface includes filtering options and a sidebar navigation.
 *
 * Features:
 * - Responsive grid layout (adapts to mobile and desktop)
 * - Status indicators with color coding (Active, Idle, Offline)
 * - Project categorization with colored tags
 * - Screenshot preview with SVG placeholders
 * - Download functionality for each screenshot
 *
 * @author Your Name
 * @version 1.0.0
 */

import React from "react";
import {
  Monitor, // Icon for screenshot monitor navigation
  FileText, // Icon for projects navigation
  Image, // Icon for screenshot navigation
  Clock, // Icon for time tracking
  FileSpreadsheet, // Icon for work reports
  ChevronDown, // Dropdown indicator for filters
  Download, // Icon for download button
} from "lucide-react";

const Screenshot = () => {
  /**
   * Sample screenshot data structure
   * In a production environment, this would be fetched from an API
   * Each object represents a screenshot with its metadata
   */
  const screenshotData = [
    {
      id: 1,
      status: "Active", // Employee working status
      project: "Marketing Campaign", // Associated project
      timestamp: "03:12 PM", // Time the screenshot was taken
      date: "Apr 15, 2025", // Date the screenshot was taken
      fullTimestamp: "03:12 PM, Apr 15, 2025", // Complete timestamp for reference
      projectColor: "green", // Color code for project categorization
    },
    {
      id: 2,
      status: "Idle", // Indicates employee is inactive
      project: "Website Redesign",
      timestamp: "02:47 PM",
      date: "Apr 15, 2025",
      fullTimestamp: "02:47 PM, Apr 15, 2025",
      projectColor: "blue",
    },
    {
      id: 3,
      status: "Offline", // Indicates employee is offline
      project: "Development",
      timestamp: "02:15 PM",
      date: "Apr 15, 2025",
      fullTimestamp: "02:15 PM, Apr 15, 2025",
      projectColor: "red",
    },
    {
      id: 4,
      status: "Active",
      project: "Marketing Campaign",
      timestamp: "02:15 PM",
      date: "Apr 15, 2025",
      fullTimestamp: "02:15 PM, Apr 15, 2025",
      projectColor: "green",
    },
  ];

  /**
   * Maps status strings to appropriate Tailwind background color classes
   * Used for status indicators (dots and badges)
   *
   * @param {string} status - Status value (Active, Idle, Offline)
   * @return {string} Tailwind background color class
   */
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500"; // Green for active status
      case "Idle":
        return "bg-yellow-500"; // Yellow for idle status
      case "Offline":
        return "bg-red-500"; // Red for offline status
      default:
        return "bg-gray-500"; // Gray as fallback
    }
  };

  /**
   * Maps status strings to appropriate Tailwind text color classes
   * Used for status text labels
   *
   * @param {string} status - Status value (Active, Idle, Offline)
   * @return {string} Tailwind text color class
   */
  const getStatusTextColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600"; // Green text for active status
      case "Idle":
        return "text-yellow-600"; // Yellow text for idle status
      case "Offline":
        return "text-red-600"; // Red text for offline status
      default:
        return "text-gray-600"; // Gray text as fallback
    }
  };

  /**
   * Maps project color codes to Tailwind color classes for project tags
   * Provides visual categorization of different project types
   *
   * @param {string} color - Color code (green, blue, red, purple)
   * @return {string} Combined Tailwind classes for background and text color
   */
  const getProjectTagColors = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800"; // Green theme for project tag
      case "blue":
        return "bg-blue-100 text-blue-800"; // Blue theme for project tag
      case "red":
        return "bg-red-100 text-red-800"; // Red theme for project tag
      case "purple":
        return "bg-purple-100 text-purple-800"; // Purple theme for project tag
      default:
        return "bg-gray-100 text-gray-800"; // Gray theme as fallback
    }
  };

  /**
   * Generates SVG placeholders for screenshot previews
   * Each placeholder represents a different type of screen content
   *
   * @param {number} id - Screenshot ID used to determine which placeholder to show
   * @return {JSX.Element} SVG element representing the screenshot
   */
  const getScreenshotPlaceholder = (id) => {
    // Array of different screenshot visualization types
    const screenshots = [
      // Type 1: Analytics/Chart view screenshot
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <rect width="100%" height="100%" fill="#f1f5f9"></rect>
        <path
          d="M4 4H20V20H4V4Z"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></path>
        <path d="M4 7H20" stroke="#94a3b8" strokeWidth="1"></path>
        <path
          d="M7 15L10 10L13 13L17 7"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></path>
        <circle cx="10" cy="10" r="0.5" fill="#94a3b8"></circle>
        <circle cx="13" cy="13" r="0.5" fill="#94a3b8"></circle>
        <circle cx="17" cy="7" r="0.5" fill="#94a3b8"></circle>
        <circle cx="7" cy="15" r="0.5" fill="#94a3b8"></circle>
      </svg>,

      // Type 2: User profile or account page screenshot
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <rect width="100%" height="100%" fill="#f1f5f9"></rect>
        <circle
          cx="12"
          cy="10"
          r="3"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></circle>
        <path
          d="M6 19C6 16 8 14 12 14C16 14 18 16 18 19"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></path>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></rect>
      </svg>,

      // Type 3: Dashboard/Content layout screenshot
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <rect width="100%" height="100%" fill="#f1f5f9"></rect>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></rect>
        <path d="M4 7H20" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M7 10H17" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M7 13H15" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M7 16H13" stroke="#94a3b8" strokeWidth="1"></path>
      </svg>,

      // Type 4: Table or spreadsheet data screenshot
      <svg
        className="w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <rect width="100%" height="100%" fill="#f1f5f9"></rect>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          stroke="#94a3b8"
          strokeWidth="1"
          fill="none"
        ></rect>
        <path d="M4 8H20" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M4 12H20" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M4 16H20" stroke="#94a3b8" strokeWidth="1"></path>
        <path d="M10 8V20" stroke="#94a3b8" strokeWidth="1"></path>
      </svg>,
    ];

    // Return screenshot placeholder based on ID (cycling through options)
    return screenshots[id % 4];
  };

  return (
    <div className="flex h-screen">
      {/*
       * Left Sidebar Navigation
       * Contains main app navigation options with icons
       */}
      <div className="w-64 bg-[#2A2D46] text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <nav className="mt-4">
          {/* Active navigation item */}
          <a
            href="#"
            className="block py-3 px-6 bg-[#373A59] font-medium text-white"
          >
            <div className="flex items-center">
              <Monitor className="w-5 h-5 mr-3" />
              Sceenshot
            </div>
          </a>
          {/* Inactive navigation items */}
          <a
            href="#"
            className="block py-3 px-6 text-gray-300 hover:bg-[#373A59] hover:text-white"
          >
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-3" />
              Projects
            </div>
          </a>
          <a
            href="#"
            className="block py-3 px-6 text-gray-300 hover:bg-[#373A59] hover:text-white"
          >
            <div className="flex items-center">
              <Image className="w-5 h-5 mr-3" />
              Screenshot
            </div>
          </a>
          <a
            href="#"
            className="block py-3 px-6 text-gray-300 hover:bg-[#373A59] hover:text-white"
          >
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3" />
              Lunch Break
            </div>
          </a>
          <a
            href="#"
            className="block py-3 px-6 text-gray-300 hover:bg-[#373A59] hover:text-white"
          >
            <div className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-3" />
              Work Report
            </div>
          </a>
        </nav>
      </div>

      {/*
       * Main Content Area
       * Contains header, filters, and screenshot grid
       */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Screenshot Monitor</h1>

          {/*
           * Filter Controls
           * Allows filtering screenshots by date, employee, project, and status
           * Responsive: stacks on mobile, displays in row on larger screens
           */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                  <option>Apr 15, 2025</option>
                  <option>Apr 14, 2025</option>
                  <option>Apr 13, 2025</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Employee Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                  <option>All Employees</option>
                  <option>Team A</option>
                  <option>Team B</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Project Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                  <option>All Projects</option>
                  <option>Marketing Campaign</option>
                  <option>Website Redesign</option>
                  <option>Mobile App Development</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Idle</option>
                  <option>Offline</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/*
           * Screenshot Cards Grid
           * Responsive layout - 1 column on mobile, 2 columns on larger screens
           * Each card displays project, screenshot, timestamp and status
           */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {screenshotData.map((screenshot) => (
              <div
                key={screenshot.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="p-5">
                  {/* Project tag with color indicator */}
                  <div className="flex items-center mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProjectTagColors(
                        screenshot.projectColor
                      )}`}
                    >
                      <span
                        className={`w-2 h-2 ${getStatusColor(
                          screenshot.status
                        )} rounded-full mr-1.5`}
                      ></span>
                      {screenshot.project}
                    </span>
                  </div>

                  {/* Screenshot preview image */}
                  <div className="border border-gray-200 rounded-md overflow-hidden mb-3 h-48 bg-gray-50">
                    {getScreenshotPlaceholder(screenshot.id)}
                  </div>

                  {/* Footer: Timestamp, status indicator, and download button */}
                  <div className="flex justify-between items-center">
                    {/* Timestamp display */}
                    <span className="text-sm text-gray-600">
                      {screenshot.timestamp}
                      {screenshot.date && <div>{screenshot.date}</div>}
                    </span>
                    <div className="flex items-center">
                      {/* Status indicator */}
                      <span
                        className={`mr-3 text-sm font-medium ${getStatusTextColor(
                          screenshot.status
                        )}`}
                      >
                        {screenshot.status}
                      </span>
                      {/* Download button */}
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screenshot;

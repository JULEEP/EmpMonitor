// EmployeeDashboard.jsx - Employee Project Management Dashboard
// This file contains all components for an employee dashboard that displays and manages projects

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  Edit2,
  LayoutDashboard,
  Users,
  Monitor,
  Activity,
  BarChart3,
  Menu,
  X,
  Search,
  Filter,
  Bell as BellIcon,
  CheckCircle,
} from "lucide-react";

// ============== DATA STRUCTURES ==============
// Sample data for active projects with their details
const projects = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In Progress",
    deadline: "June 15, 2024",
    hours: 45,
    team: [
      {
        id: 101,
        name: "Emily Cooper",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      },
    ],
  },
  // ... (other project objects remain the same)
];

// Sample data for completed projects
const completedProjects = [
  {
    id: 101,
    title: "Brand Style Guide",
    completionDate: "April 8, 2024",
    team: [
      {
        id: 201,
        name: "David Wilson",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
    ],
  },
  // ... (other completed project objects remain the same)
];

// ============== UTILITY FUNCTIONS ==============
/**
 * Returns CSS classes based on project status for styling
 * @param {string} status - Project status (e.g., "In Progress")
 * @returns {string} Tailwind CSS classes for the status badge
 */
const getStatusClass = (status) => {
  switch (status) {
    case "In Progress":
      return "bg-[#f59e0b] bg-opacity-20 text-[#f59e0b]";
    case "Not Started":
      return "bg-[#64748b] bg-opacity-20 text-[#64748b]";
    // ... (other cases remain the same)
    default:
      return "bg-gray-200 text-gray-600";
  }
};

// ============== COMPONENTS ==============

/**
 * CompletedProject - Displays a card for a finished project
 * @param {Object} props - Component props
 * @param {Object} props.project - The completed project data
 */
function CompletedProject({ project }) {
  const { title, completionDate, team } = project;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Project header with title and completion badge */}
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-semibold text-gray-800 flex-1 mr-2">
            {title}
          </h3>
          {/* Completion indicator */}
          <span className="flex items-center gap-1 text-[#10b981] whitespace-nowrap">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-medium hidden xs:inline">
              Completed
            </span>
          </span>
        </div>

        {/* Project details */}
        <div className="flex flex-col space-y-2">
          {/* Team member avatar */}
          {team && team[0] && (
            <div className="flex items-center">
              <img
                src={team[0].avatar}
                alt="Client"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mr-2"
              />
              <span className="text-xs sm:text-sm text-gray-600">Client</span>
            </div>
          )}

          {/* Completion date */}
          {completionDate && (
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 mr-2" />
              <span className="text-xs sm:text-sm text-gray-600">
                Completed on: {completionDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ProjectCard - Interactive card for displaying and editing project details
 * @param {Object} props - Component props
 * @param {Object} props.project - The project data to display
 */
function ProjectCard({ project }) {
  // Destructure project data with defaults
  const {
    id,
    title,
    status: initialStatus,
    deadline: initialDeadline,
    hours: initialHours,
    team,
  } = project;

  // State management for editable fields
  const [status, setStatus] = useState(initialStatus);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [hours, setHours] = useState(initialHours);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);
  const statusClass = getStatusClass(status);
  const dropdownRef = useRef(null);

  // Close status dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Available status options for dropdown
  const statusOptions = ["In Progress", "Not Started", "Started", "Completed"];

  // Handler for status change
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsStatusDropdownOpen(false);
    console.log(`Project ${id} status updated to: ${newStatus}`);
  };

  // Handlers for editable fields
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    console.log(`Project ${id} deadline updated to: ${e.target.value}`);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    console.log(`Project ${id} hours updated to: ${e.target.value}`);
  };

  // Toggle edit modes
  const toggleDeadlineEdit = () => {
    setIsEditingDeadline(!isEditingDeadline);
    if (isEditingHours) setIsEditingHours(false);
  };

  const toggleHoursEdit = () => {
    setIsEditingHours(!isEditingHours);
    if (isEditingDeadline) setIsEditingDeadline(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4 sm:p-6">
        {/* Project header with title and status dropdown */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mr-3">
            {title}
          </h3>

          {/* Status dropdown with click-outside handling */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium ${statusClass}`}
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={isStatusDropdownOpen}
            >
              {status} <ChevronDown className="ml-1 h-3 w-3" />
            </button>

            {/* Status dropdown options */}
            {isStatusDropdownOpen && (
              <div className="absolute right-0 mt-1 z-10 bg-white border border-gray-200 rounded-md shadow-lg py-1 w-32">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 text-xs ${
                      option === status ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleStatusChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project details section */}
        <div className="flex flex-col space-y-3">
          {/* Team member display */}
          {team && team[0] && (
            <div className="flex items-center">
              <img
                src={team[0].avatar}
                alt="Client"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2"
              />
              <span className="text-xs sm:text-sm text-gray-700">Client</span>
            </div>
          )}

          {/* Editable deadline field */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center flex-1 mr-2">
              <Calendar className="h-4 w-4 flex-shrink-0 text-gray-500 mr-2" />

              {isEditingDeadline ? (
                <input
                  type="text"
                  value={deadline}
                  onChange={handleDeadlineChange}
                  onBlur={toggleDeadlineEdit}
                  autoFocus
                  className="w-full text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#3498db]"
                  placeholder="e.g. June 15, 2024"
                />
              ) : (
                <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                  Deadline: {deadline}
                </span>
              )}
            </div>

            {/* Deadline edit button */}
            <button
              onClick={toggleDeadlineEdit}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] rounded-full p-1"
              aria-label="Edit deadline"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Editable hours field */}
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 mr-2">
              <Clock className="h-4 w-4 flex-shrink-0 text-gray-500 mr-2" />

              {isEditingHours ? (
                <div className="flex items-center">
                  <input
                    type="number"
                    value={hours}
                    onChange={handleHoursChange}
                    onBlur={toggleHoursEdit}
                    autoFocus
                    className="w-16 text-xs sm:text-sm font-medium text-gray-700 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#3498db]"
                    min="1"
                  />
                  <span className="ml-1 text-xs sm:text-sm font-medium text-gray-700">
                    hours
                  </span>
                </div>
              ) : (
                <span className="text-xs sm:text-sm font-medium text-gray-700">
                  {hours} hours allocated
                </span>
              )}
            </div>

            {/* Hours edit button */}
            <button
              onClick={toggleHoursEdit}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] rounded-full p-1"
              aria-label="Edit hours"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project footer with details link */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200 flex justify-between items-center">
        <a
          href="#"
          className="text-xs sm:text-sm font-medium text-[#3498db] hover:text-[#2980b9] transition-colors focus:outline-none focus:underline"
        >
          View Details
        </a>
      </div>
    </div>
  );
}

/**
 * ProjectList - Main container for displaying filtered projects
 * Includes search and filter functionality
 */
function ProjectList() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showFilters, setShowFilters] = useState(false);

  // Filter projects based on search term and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <main className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      {/* Header and filter controls */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Assigned Projects
            </h2>
            <p className="text-sm text-gray-500">
              You have {projects.length} active projects
            </p>
          </div>
          {/* Mobile filter toggle button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded-md border border-gray-300 bg-white"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Responsive filter section */}
        <div
          className={`${
            showFilters ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 mt-3 md:mt-0`}
        >
          {/* Search input */}
          <div className="relative flex-grow md:max-w-md">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#3498db] focus:border-[#3498db]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 absolute right-3 top-2 text-gray-400" />
          </div>

          {/* Status filter dropdown */}
          <div className="md:ml-2 w-full md:w-auto">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-[#3498db] focus:border-[#3498db]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Statuses</option>
              <option>In Progress</option>
              <option>Not Started</option>
              <option>Started</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project grid - responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-10">
            <p className="text-gray-500">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Completed projects section */}
      {completedProjects.length > 0 && (
        <div className="mt-8 sm:mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Completed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {completedProjects.map((project) => (
              <CompletedProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

/**
 * Header - Top navigation bar with tabs and user controls
 */
function Header() {
  const [activeTab, setActiveTab] = useState("Projects");

  const tabs = ["Projects", "Settings"];

  return (
    <header className="bg-white shadow-sm w-full">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        {/* Page title */}
        <div className="flex items-center">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            My Projects
          </h1>
        </div>

        {/* User controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            type="button"
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db]"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <span className="h-5 sm:h-6 w-px bg-gray-300 hidden sm:block"></span>
          {/* User avatar */}
          <button
            type="button"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] rounded-full"
            aria-label="User menu"
          >
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-[#3498db] text-[#3498db]"
                : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </header>
  );
}

/**
 * Sidebar - Navigation sidebar with responsive behavior
 */
function Sidebar() {
  // State for active menu item and mobile menu visibility
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and adjust mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Sidebar menu items
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Employees", icon: Users },
    { name: "Screenshot", icon: Monitor },
    { name: "Activity", icon: Activity },
    { name: "Work Report", icon: BarChart3 },
  ];

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle menu item click
  const handleItemClick = (name) => {
    setActiveItem(name);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  /**
   * MobileMenuButton - Floating action button for mobile menu toggle
   */
  const MobileMenuButton = () => (
    <button
      className="fixed bottom-4 right-4 z-50 bg-[#2c3e50] text-white p-3 rounded-full shadow-lg md:hidden"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <>
      <MobileMenuButton />

      {/* Sidebar container with responsive behavior */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#2c3e50] text-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
      >
        {/* Branding */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">HR</h1>
        </div>

        {/* Navigation menu */}
        <nav className="mt-4 h-[calc(100vh-12rem)] overflow-y-auto">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center px-6 py-3 hover:bg-opacity-50 text-white rounded-lg mx-2 mb-1 ${
                    activeItem === item.name
                      ? "bg-white bg-opacity-20"
                      : "hover:bg-[#1a2530]"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">John Employee</p>
              <p className="text-xs text-gray-300">Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

/**
 * EmployeeDashboard - Main component that composes the entire dashboard layout
 */
function EmployeeDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full md:pl-64">
        {/* Header - Top navigation */}
        <Header />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto">
          {/* Project list - Main content */}
          <ProjectList />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

// EmployeeProjects.jsx - Employee Project Management Dashboard
// This file contains components for creating new projects

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  Edit2,
  Check,
  X,
  Plus,
  Bell as BellIcon,
} from "lucide-react";

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
    case "Started":
      return "bg-[#3498db] bg-opacity-20 text-[#3498db]";
    case "Completed":
      return "bg-[#10b981] bg-opacity-20 text-[#10b981]";
    case "Delayed":
      return "bg-[#ef4444] bg-opacity-20 text-[#ef4444]";
    case "On Hold":
      return "bg-[#8b5cf6] bg-opacity-20 text-[#8b5cf6]";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

// Sample client data (in a real application this would come from an API)
const availableClients = [
  {
    id: 101,
    name: "Emily Cooper",
    email: "emily@example.com",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 102,
    name: "David Wilson",
    email: "david@example.com",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

// ============== COMPONENTS ==============

/**
 * Sidebar component for site navigation
 */
function Sidebar() {
  return (
    <aside className="bg-[#2c3e50] w-48 flex-shrink-0 fixed h-screen text-white hidden md:block">
      <div className="p-4 text-xl font-bold">HR</div>
      <nav className="mt-6">
        <ul className="space-y-1">
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-opacity-20 hover:bg-white"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 bg-white bg-opacity-10 text-white"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Employees
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-opacity-20 hover:bg-white"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Screenshot
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-opacity-20 hover:bg-white"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              Activity
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-opacity-20 hover:bg-white"
            >
              <svg
                className="h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              Work Report
            </a>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 mr-3 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="John Employee"
              className="rounded-full"
            />
          </div>
          <div className="text-sm">
            <div className="font-medium">John Employee</div>
            <div className="text-xs text-gray-400">Developer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/**
 * NewProjectForm - Form for creating new projects
 */
function NewProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    status: "Not Started",
    deadline: "",
    hours: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedClientId, setSelectedClientId] = useState(
    availableClients[0].id
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle client selection
  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Project title is required";
    }

    if (!formData.deadline) {
      errors.deadline = "Deadline is required";
    }

    if (!formData.hours) {
      errors.hours = "Hours must be specified";
    } else if (parseInt(formData.hours) < 1) {
      errors.hours = "Hours must be at least 1";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would normally send the data to your server
      alert(`Project "${formData.title}" has been created successfully.`);

      // Reset the form
      setFormData({
        title: "",
        status: "Not Started",
        deadline: "",
        hours: "",
      });
      setIsPreviewMode(false);
    }
  };

  // Show preview
  const handlePreview = () => {
    if (validateForm()) {
      setIsPreviewMode(true);
      // Scroll to preview section
      setTimeout(() => {
        const previewEl = document.getElementById("projectPreview");
        if (previewEl) {
          window.scrollTo({
            top: previewEl.offsetTop - 20,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  // Close preview
  const closePreview = () => {
    setIsPreviewMode(false);
  };

  // Format the date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get the selected client
  const selectedClient = availableClients.find(
    (c) => c.id === selectedClientId
  );

  return (
    <div className="flex-1">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-medium">My Projects</h1>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
          >
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex space-x-4">
          <a href="/" className="text-gray-500 px-2 py-2 text-sm font-medium">
            Projects
          </a>
          <a
            href="#"
            className="text-[#3498db] border-b-2 border-[#3498db] px-2 py-2 text-sm font-medium"
          >
            New Project
          </a>
          <a href="#" className="text-gray-500 px-2 py-2 text-sm font-medium">
            Settings
          </a>
        </div>
      </div>

      {/* New Project Form */}
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Create New Project
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill out the form below to create a new project
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 sm:p-6 space-y-6">
              {/* Project Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                  className={`w-full px-3 py-2 border ${
                    formErrors.title ? "border-[#ef4444]" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] text-sm`}
                />
                {formErrors.title && (
                  <p className="mt-1 text-xs text-[#ef4444]">
                    {formErrors.title}
                  </p>
                )}
              </div>

              {/* Project Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] text-sm"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Started">Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Project Deadline Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={`w-full pl-10 px-3 py-2 border ${
                      formErrors.deadline
                        ? "border-[#ef4444]"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] text-sm`}
                  />
                </div>
                {formErrors.deadline && (
                  <p className="mt-1 text-xs text-[#ef4444]">
                    {formErrors.deadline}
                  </p>
                )}
              </div>

              {/* Hours Allocated Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours Allocated <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <input
                    type="number"
                    name="hours"
                    min="1"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="Hours needed"
                    className={`w-full pl-10 px-3 py-2 border ${
                      formErrors.hours ? "border-[#ef4444]" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] text-sm`}
                  />
                </div>
                {formErrors.hours && (
                  <p className="mt-1 text-xs text-[#ef4444]">
                    {formErrors.hours}
                  </p>
                )}
              </div>

              {/* Client Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Client <span className="text-[#ef4444]">*</span>
                </label>

                {availableClients.map((client) => (
                  <div
                    key={client.id}
                    className={`relative px-4 py-3 border ${
                      selectedClientId === client.id
                        ? "border-[#3498db]"
                        : "border-gray-200"
                    } rounded-md mb-2 flex items-center cursor-pointer hover:border-gray-300`}
                    onClick={() => handleClientSelect(client.id)}
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-8 h-8 rounded-full mr-3 overflow-hidden">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{client.name}</h4>
                        <p className="text-xs text-gray-500">{client.email}</p>
                      </div>
                    </div>
                    {selectedClientId === client.id && (
                      <div className="w-5 h-5 rounded-full bg-[#3498db] flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="mt-2 text-sm text-[#3498db] hover:text-[#2980b9] flex items-center"
                >
                  <svg
                    className="h-4 w-4 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add New Client
                </button>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3">
                <button
                  type="button"
                  className="mb-2 sm:mb-0 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mb-2 sm:mb-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#64748b] hover:bg-[#64748b]/90"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={handlePreview}
                  className="mb-2 sm:mb-0 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9]"
                >
                  Preview Project
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Project Preview Section */}
        {isPreviewMode && (
          <div
            className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            id="projectPreview"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-row justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  Project Preview
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Review your project details before submission
                </p>
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Project Card Preview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                  {/* Project header with title and status */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mr-3">
                      {formData.title || "Project Title"}
                    </h3>
                    <span
                      className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        formData.status
                      )}`}
                    >
                      {formData.status}
                    </span>
                  </div>

                  {/* Project details section */}
                  <div className="flex flex-col space-y-3">
                    {/* Client display */}
                    <div className="flex items-center">
                      <img
                        src={selectedClient.avatar}
                        alt="Client"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2"
                      />
                      <span className="text-xs sm:text-sm text-gray-700">
                        Client
                      </span>
                    </div>

                    {/* Deadline field */}
                    <div className="flex items-center mt-3">
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-gray-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        Deadline: {formatDate(formData.deadline)}
                      </span>
                    </div>

                    {/* Hours field */}
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-gray-500 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {formData.hours} hours allocated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project footer with action buttons */}
                <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200 flex justify-between items-center">
                  <a
                    href="#"
                    className="text-xs sm:text-sm font-medium text-[#3498db] hover:text-[#2980b9] transition-colors focus:outline-none focus:underline"
                  >
                    View Details
                  </a>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#10b981] hover:bg-[#10b981]/90"
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * EmployeeProjects - Main component for project management dashboard
 */
function EmployeeProjects() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 md:ml-48">
        <NewProjectForm />
      </div>
    </div>
  );
}

export default EmployeeProjects;

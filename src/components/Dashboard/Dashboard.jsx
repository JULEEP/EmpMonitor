import React, { useEffect, useRef, useState } from "react";
import {
  FiClock,
  FiSearch,
  FiSettings,
  FiBell,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiActivity,
  FiAward,
  FiStar,
  FiBarChart2,
  FiTrendingUp,
} from "react-icons/fi";
import {
  FaHome,
  FaRegClock,
  FaChartLine,
  FaRegCopy,
  FaCamera,
  FaRegListAlt,
  FaRegFileAlt,
  FaColumns,
  FaUsers,
  FaMedal,
  FaTrophy,
  FaUserCheck,
  FaRegLightbulb,
  FaChartBar,
} from "react-icons/fa";
import gsap from "gsap";

const Dashboard = () => {
  // Refs for animations
  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const statusCardsRef = useRef([]);
  const userListsRef = useRef([]);
  const onlineUsersRef = useRef(null);
  const performanceRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Counter animation function
  const animateCounter = (element, end, duration = 1.5) => {
    let start = 0;
    const obj = { value: start };

    gsap.to(obj, {
      value: end,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (element) {
          element.textContent = Math.round(obj.value);
        }
      },
      onComplete: () => {
        // Add a subtle bounce effect when counter finishes
        gsap.fromTo(
          element,
          { scale: 1 },
          {
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );
      },
    });
  };

  // Progressively animate horizontal bar charts
  const animateProgressBar = (element, targetWidth) => {
    if (!element) return;

    gsap.fromTo(
      element,
      { width: 0 },
      {
        width: targetWidth,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.2,
      }
    );
  };
  // Mock data for dashboard stats
  const stats = {
    teamMembers: 35,
    presentMembers: 34,
    absentMembers: 0,
    lateMembers: 0,
  };

  // Mock data for user lists
  const productiveUsers = [
    {
      id: 1,
      name: "Sheila Bryant",
      time: "8h 40m",
      color: "bg-pink-500",
      avatarText: "SB",
    },
    {
      id: 2,
      name: "Ian Corby",
      time: "8h 35m",
      color: "bg-blue-500",
      avatarText: "IC",
    },
    {
      id: 3,
      name: "Jordan Franklin",
      time: "8h 25m",
      color: "bg-purple-500",
      avatarText: "JF",
    },
    {
      id: 4,
      name: "Victoria Bradley",
      time: "8h 10m",
      color: "bg-green-500",
      avatarText: "VB",
    },
    {
      id: 5,
      name: "David Linsec",
      time: "8h 5m",
      color: "bg-teal-500",
      avatarText: "DL",
    },
  ];

  const unproductiveUsers = [
    {
      id: 6,
      name: "Pierce Norton",
      time: "3h 45m",
      color: "bg-gray-500",
      avatarText: "PN",
    },
    {
      id: 7,
      name: "Kristina Kumar",
      time: "4h 10m",
      color: "bg-red-500",
      avatarText: "KK",
    },
    {
      id: 8,
      name: "James Johnson",
      time: "4h 25m",
      color: "bg-blue-400",
      avatarText: "JJ",
    },
    {
      id: 9,
      name: "Sam Alvarez",
      time: "5h 15m",
      color: "bg-blue-500",
      avatarText: "SA",
    },
  ];

  const idleUsers = [
    { id: 10, name: "Thomas Winters", color: "bg-red-500", avatarText: "TW" },
    { id: 11, name: "Sarah Pike", color: "bg-yellow-500", avatarText: "SP" },
    { id: 12, name: "John Ma", color: "bg-blue-500", avatarText: "JM" },
    { id: 13, name: "Carlos Wee", color: "bg-purple-500", avatarText: "CW" },
  ];

  // Animation effect hooks
  useEffect(() => {
    // Run animations after first render when refs are set
    const runAnimations = () => {
      // Animate sidebar if ref exists
      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Animate header if ref exists
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            // Animate tabs with stagger effect
            const tabs = document.querySelectorAll(
              ".flex.items-center.space-x-1"
            );
            if (tabs.length) {
              gsap.fromTo(
                tabs,
                { opacity: 0, y: -20 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.4,
                  ease: "power2.out",
                }
              );
            }
          },
        });
      }

      // Animate status cards with stagger
      const cardElements = statusCardsRef.current.filter(
        (card) => card !== null
      );
      if (cardElements.length) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
            onComplete: () => {
              // Animate the counters after cards appear
              cardElements.forEach((card, index) => {
                if (card) {
                  const counterElement = card.querySelector("p");
                  if (counterElement) {
                    let targetValue = 0;

                    switch (index) {
                      case 0:
                        targetValue = stats.teamMembers;
                        break;
                      case 1:
                        targetValue = stats.presentMembers;
                        break;
                      case 2:
                        targetValue = stats.absentMembers;
                        break;
                      case 3:
                        targetValue = stats.lateMembers;
                        break;
                      default:
                        break;
                    }

                    animateCounter(counterElement, targetValue);
                  }
                }
              });
            },
          }
        );
      }

      // Animate user lists with stagger if refs exist
      const userLists = userListsRef.current.filter((list) => list !== null);
      if (userLists.length) {
        gsap.fromTo(
          userLists,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }

      // Animate online users section if ref exists
      if (onlineUsersRef.current) {
        gsap.fromTo(
          onlineUsersRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, delay: 1.8, ease: "power2.out" }
        );
      }

      // Animate performance report if ref exists
      if (performanceRef.current) {
        gsap.fromTo(
          performanceRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 2.1,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => {
              // Add a subtle pulse effect to the View button
              if (performanceRef.current) {
                const viewButton =
                  performanceRef.current.querySelector("button");
                if (viewButton) {
                  gsap.to(viewButton, {
                    scale: 1.1,
                    repeat: -1,
                    yoyo: true,
                    duration: 1.5,
                    ease: "sine.inOut",
                  });
                }
              }

              // Animate progress bars
              const progressBars = document.querySelectorAll(".progress-bar");
              if (progressBars.length) {
                progressBars.forEach((bar, index) => {
                  // Get the target width from data attribute
                  const targetWidth = bar.getAttribute("data-width") || "0%";

                  // Animate with staggered delay
                  setTimeout(() => {
                    animateProgressBar(bar, targetWidth);
                  }, index * 300);
                });
              }
            },
          }
        );
      }
    };

    // Small delay to ensure all refs are properly set
    const timer = setTimeout(runAnimations, 100);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  // Render a status card
  const renderStatusCard = (title, count, color, icon, index) => {
    // Get gradient background based on color
    const getGradient = () => {
      switch (color) {
        case "bg-green-500":
          return "bg-gradient-to-br from-green-400 to-green-600";
        case "bg-orange-400":
          return "bg-gradient-to-br from-orange-300 to-orange-500";
        case "bg-cyan-400":
          return "bg-gradient-to-br from-cyan-300 to-cyan-500";
        case "bg-pink-500":
          return "bg-gradient-to-br from-pink-400 to-pink-600";
        default:
          return color;
      }
    };

    const getIcon = () => {
      switch (icon) {
        case "team":
          return (
            <FaTrophy
              size={24}
              className="text-white/80 sm:text-2xl md:text-3xl filter drop-shadow-md"
            />
          );
        case "present":
          return (
            <FaUserCheck
              size={24}
              className="text-white/80 sm:text-2xl md:text-3xl filter drop-shadow-md"
            />
          );
        case "absent":
          return (
            <FiUserX
              size={24}
              className="text-white/80 sm:text-2xl md:text-3xl filter drop-shadow-md"
            />
          );
        case "late":
          return (
            <FiClock
              size={24}
              className="text-white/80 sm:text-2xl md:text-3xl filter drop-shadow-md"
            />
          );
        default:
          return (
            <FiUsers
              size={24}
              className="text-white/80 sm:text-2xl md:text-3xl filter drop-shadow-md"
            />
          );
      }
    };

    return (
      <div
        ref={(el) => (statusCardsRef.current[index] = el)}
        className={`${getGradient()} text-white rounded-sm sm:rounded-md shadow-lg backdrop-blur-sm p-3 md:p-4 flex items-center h-24 sm:h-28 md:h-32 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] overflow-hidden relative`}
      >
        {/* Background pattern for visual interest */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10 blur-md"></div>
        <div className="absolute right-8 bottom-8 w-12 h-12 rounded-full bg-white/5"></div>

        <div className="flex-1 z-10">
          <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 drop-shadow-md">
            {title}
          </h3>
          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight drop-shadow-md">
            0
          </p>
        </div>
        <div className="z-10 bg-white/10 p-2 rounded-full transition-transform duration-300 hover:rotate-12 hover:scale-110 shadow-md">
          {getIcon()}
        </div>
      </div>
    );
  };

  // Render a user list
  const renderUserList = (title, users, bgColor, index) => {
    // Get gradient background based on color
    const getGradient = () => {
      switch (bgColor) {
        case "bg-green-500":
          return "bg-gradient-to-r from-green-500 to-green-600";
        case "bg-yellow-500":
          return "bg-gradient-to-r from-yellow-400 to-yellow-500";
        case "bg-yellow-400":
          return "bg-gradient-to-r from-yellow-300 to-yellow-400";
        case "bg-pink-500":
          return "bg-gradient-to-r from-pink-400 to-pink-500";
        default:
          return bgColor;
      }
    };

    // Get icon based on list type
    const getIcon = () => {
      switch (index) {
        case 0:
          return <FiStar className="text-white/80 filter drop-shadow-sm" />;
        case 1:
          return <FiActivity className="text-white/80 filter drop-shadow-sm" />;
        case 2:
          return (
            <FiUserCheck className="text-white/80 filter drop-shadow-sm" />
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={(el) => (userListsRef.current[index] = el)}
        className={`${getGradient()} rounded-sm sm:rounded-md shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden`}
      >
        <div className="p-2 flex items-center justify-between border-b border-white/20">
          <h3 className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm">
            {title}
          </h3>
          {getIcon()}
        </div>
        <div className="bg-white/95 backdrop-blur-sm p-2 overflow-y-auto max-h-60 sm:max-h-none">
          {users.map((user, idx) => (
            <div
              key={user.id}
              className="flex items-center py-1.5 px-1 border-b border-gray-100 transition-all duration-300 hover:bg-blue-50/80 hover:shadow-sm cursor-pointer rounded-sm my-0.5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${user.color} rounded-full mr-2 flex items-center justify-center text-white font-medium text-xs transition-all duration-300 hover:scale-110 shadow-sm`}
              >
                {user.avatarText}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-800 font-medium truncate">
                  {user.name}
                </p>
                {user.time && (
                  <div className="flex items-center">
                    <FaRegClock className="text-gray-400 text-xs mr-1" />
                    <p className="text-xs text-gray-500 truncate">
                      {user.time}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Initialize refs array for status cards
  useEffect(() => {
    // Initialize empty arrays for multiple refs
    statusCardsRef.current = Array(4)
      .fill()
      .map(() => null);
    userListsRef.current = Array(3)
      .fill()
      .map(() => null);
  }, []);

  return (
    <div className="flex h-screen flex-col sm:flex-row">
      {/* Mobile top bar - visible only on small screens */}
      <div className="sm:hidden bg-gradient-to-r from-blue-900 to-blue-700 text-white p-2 flex justify-between items-center shadow-md relative overflow-hidden">
        <div className="absolute -left-8 -bottom-8 w-16 h-16 rounded-full bg-white/5 blur-sm"></div>
        <div className="flex items-center z-10">
          <div className="flex items-center justify-center bg-blue-600/50 p-1.5 rounded-full shadow-md mr-3">
            <FiClock size={20} className="text-white filter drop-shadow-sm" />
          </div>
          <span className="font-bold tracking-wide text-white drop-shadow-sm">
            TIMECHAMP
          </span>
        </div>
        <div className="flex items-center space-x-2 z-10">
          <button className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 focus:outline-none">
            <FiSearch size={18} />
          </button>
          <button
            className="p-1.5 bg-blue-600/70 hover:bg-blue-500/70 rounded-md focus:outline-none shadow-sm transition-all duration-300 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - visible only when toggled on small screens */}
      <div
        className={`sm:hidden bg-gradient-to-b from-blue-800 to-blue-700 text-white shadow-lg transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-96 py-2 opacity-100"
            : "max-h-0 py-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaRegClock size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Timesheet</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaChartLine size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Productivity</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaRegCopy size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Timeline</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaCamera size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Screenshots</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaRegListAlt size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Detailed</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaRegFileAlt size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Reports</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaColumns size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
        </div>
        <div className="px-4 py-2 my-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 active:scale-95">
          <div className="flex items-center space-x-3">
            <FaUsers size={16} className="text-blue-200" />
            <span className="text-sm font-medium">Team</span>
          </div>
        </div>
      </div>

      {/* Sidebar - hidden on small screens */}
      <div
        ref={sidebarRef}
        className="hidden sm:flex sm:flex-col sm:w-16 md:w-20 lg:w-64 bg-gradient-to-b from-blue-800 to-blue-700 text-white shadow-lg"
      >
        {/* Sidebar header with logo */}
        <div className="flex items-center justify-center lg:justify-start p-3 border-b border-blue-600">
          <div className="flex items-center justify-center bg-blue-600/50 p-1.5 rounded-full shadow-md">
            <FiClock size={24} className="text-white filter drop-shadow-sm" />
          </div>
          <span className="ml-2 font-bold tracking-wide text-white drop-shadow-sm hidden lg:block">
            TIMECHAMP
          </span>
        </div>

        {/* Sidebar navigation */}
        <div className="flex-1 overflow-y-auto pt-2">
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaHome size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Home
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaRegClock size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Timesheet
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaChartLine size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Productivity
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaRegCopy size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Timeline
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaCamera size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Screenshots
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaRegListAlt size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Detailed
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaRegFileAlt size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Reports
            </span>
          </div>
          <div className="px-2 py-2 mt-1 bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaColumns size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Dashboard
            </span>
          </div>
          <div className="px-2 py-2 mt-1 hover:bg-blue-600/70 rounded-md mx-2 transition-all duration-300 flex items-center justify-center lg:justify-start">
            <FaUsers size={18} className="text-blue-200" />
            <span className="ml-3 text-sm font-medium hidden lg:block">
              Team
            </span>
          </div>
        </div>

        {/* User profile section */}
        <div className="p-3 border-t border-blue-600 hidden lg:block">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 flex items-center justify-center text-white font-medium text-xs">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate text-white">
                John Doe
              </p>
              <p className="text-xs text-blue-200 truncate">Project Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
        {/* Top header with search and actions */}
        <div
          ref={headerRef}
          className="bg-white shadow-md p-3 flex items-center justify-between border-b border-gray-200 sticky top-0 z-10"
        >
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800 hidden sm:block">
            Team Dashboard
          </h1>

          {/* Tab navigation for medium screens */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <div className="flex items-center space-x-1 text-blue-600 border-b-2 border-blue-500 px-2 py-1">
              <FaColumns size={14} />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-300 px-2 py-1">
              <FaRegClock size={14} />
              <span className="text-sm font-medium">Timesheet</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-300 px-2 py-1">
              <FaChartLine size={14} />
              <span className="text-sm font-medium">Productivity</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-300 px-2 py-1">
              <FaUsers size={14} />
              <span className="text-sm font-medium">Team</span>
            </div>
          </div>

          <div className="flex-1 md:flex-none md:ml-4 max-w-sm hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search teams, members..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800 text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none hover:bg-gray-100 rounded-full transition-all duration-300">
              <FiSettings />
            </button>
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none hover:bg-gray-100 rounded-full transition-all duration-300">
                <FiBell />
              </button>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-xs shadow-md hidden sm:flex hover:shadow-lg transition-shadow duration-300">
              JD
            </div>
          </div>
        </div>

        {/* Main dashboard content */}
        <div className="flex-1 p-3 md:p-6">
          {/* Status cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
            {renderStatusCard(
              "Team Members",
              stats.teamMembers,
              "bg-cyan-400",
              "team",
              0
            )}
            {renderStatusCard(
              "Present Today",
              stats.presentMembers,
              "bg-green-500",
              "present",
              1
            )}
            {renderStatusCard(
              "Absent Today",
              stats.absentMembers,
              "bg-orange-400",
              "absent",
              2
            )}
            {renderStatusCard(
              "Late Today",
              stats.lateMembers,
              "bg-pink-500",
              "late",
              3
            )}
          </div>

          {/* Activity section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Productive users */}
            {renderUserList(
              "MOST PRODUCTIVE USERS",
              productiveUsers,
              "bg-green-500",
              0
            )}

            {/* Unproductive users */}
            {renderUserList(
              "LEAST PRODUCTIVE USERS",
              unproductiveUsers,
              "bg-yellow-400",
              1
            )}

            {/* Online users */}
            <div
              ref={onlineUsersRef}
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm sm:rounded-md shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden"
            >
              <div className="p-2 flex items-center justify-between border-b border-white/20">
                <h3 className="font-semibold text-xs sm:text-sm text-white drop-shadow-sm">
                  CURRENTLY ACTIVE
                </h3>
                <FiUserCheck className="text-white/80 filter drop-shadow-sm" />
              </div>
              <div className="bg-white/95 backdrop-blur-sm p-3 overflow-y-auto max-h-60 sm:max-h-none">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                  {idleUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex flex-col items-center bg-white rounded-md shadow-sm p-2 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${user.color} rounded-full mb-1 flex items-center justify-center text-white font-medium text-xs sm:text-sm shadow-sm`}
                      >
                        {user.avatarText}
                      </div>
                      <p className="text-xs text-gray-800 font-medium text-center truncate w-full">
                        {user.name}
                      </p>
                      <div className="mt-1 flex items-center justify-center bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Active
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Performance report */}
          <div
            ref={performanceRef}
            className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-sm sm:rounded-md shadow-lg p-4 mb-4 text-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm sm:text-base font-semibold flex items-center">
                <FiBarChart2 className="mr-2 text-white/80" />
                TEAMS PERFORMANCE REPORT
              </h3>
              <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-1.5 rounded shadow-md text-sm hover:from-blue-400 hover:to-blue-300 transition-all duration-300 font-medium flex items-center">
                <span>View</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Progress bars */}
            <div className="space-y-4 relative">
              {/* Background decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/5 blur-lg"></div>
              <div className="absolute left-1/4 -top-4 w-16 h-16 rounded-full bg-white/5 blur-md"></div>

              <div className="relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span>Design Team</span>
                  <span>96%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-green-400 to-green-300 rounded-full"
                    data-width="96%"
                  ></div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span>Development Team</span>
                  <span>84%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"
                    data-width="84%"
                  ></div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span>Marketing Team</span>
                  <span>72%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-purple-400 to-purple-300 rounded-full"
                    data-width="72%"
                  ></div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between text-xs mb-1">
                  <span>QA Team</span>
                  <span>58%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full"
                    data-width="58%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

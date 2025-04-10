import React, { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import gsap from "gsap";

function EmployeeForm() {
  // Form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "weak",
  });
  const [mobileError, setMobileError] = useState("");

  // Refs for animations
  const formRef = useRef(null);
  const formContainerRef = useRef(null);

  // Initialize animations
  useEffect(() => {
    if (formRef.current) {
      // Animate form elements on initial load
      gsap.from(
        formRef.current.querySelectorAll('input, button[type="submit"]'),
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Animate header elements
      gsap.from(formRef.current.querySelectorAll("h2, p"), {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, []);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });

      // Clear any previous mobile error
      if (name === "mobile") {
        setMobileError("");
      }
    }

    // Update password strength if password field changes
    if (name === "password") {
      updatePasswordStrength(value);
    }

    // Animate the input field when focused
    const inputElement = e.target;
    gsap.to(inputElement, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  // Password strength calculator
  const updatePasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = "weak";
    if (score === 2) label = "moderate";
    else if (score === 3) label = "strong";
    else if (score === 4) label = "very strong";

    setPasswordStrength({ score, label });
  };

  // Mobile number validation
  const validateMobile = () => {
    const mobileRegex = /^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (!formData.mobile) {
      setMobileError("Mobile number is required");
      return false;
    } else if (!mobileRegex.test(formData.mobile)) {
      setMobileError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate only if on signup form
    if (isSignUp) {
      const mobileValid = validateMobile();
      if (!mobileValid) return;
    }

    // Animate submit button
    const submitButton = e.target.querySelector('button[type="submit"]');
    gsap.to(submitButton, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Show success animation
        gsap.to(submitButton, {
          backgroundColor: "#10b981", // Green color
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // Reset button color after delay
            gsap.to(submitButton, {
              backgroundColor: "#4f46e5", // Back to indigo
              duration: 0.3,
              delay: 1,
              ease: "power2.out",
            });
          },
        });
      },
    });

    console.log("Form submitted:", formData);
    alert(isSignUp ? "Account Created!" : "Signed In!");
  };

  // Form toggle handler
  const toggleForm = () => {
    // First animate out current form
    gsap.to(formRef.current.querySelectorAll('input, button[type="submit"]'), {
      y: 10,
      opacity: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Switch form type
        setIsSignUp(!isSignUp);
        setFormData({
          mobile: "",
          name: "",
          email: "",
          password: "",
          terms: false,
        });
        setPasswordStrength({ score: 0, label: "weak" });

        // Then animate in new form after state update
        setTimeout(() => {
          gsap.to(
            formRef.current.querySelectorAll('input, button[type="submit"]'),
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.3,
              ease: "power2.out",
              delay: 0.1,
            }
          );
        }, 50);
      },
    });
  };

  // Password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    // Animate the eye icon
    const eyeIcon = document.querySelector(".password-toggle");
    gsap.to(eyeIcon, {
      rotate: showPassword ? 0 : 360,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      ref={formContainerRef}
    >
      {/* Left side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative border border-gray-300">
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500"></div>

            {/* Tab navigation */}
            <nav className="flex text-sm font-medium border-b">
              <button
                type="button"
                className={`w-1/2 py-4 px-1 text-center border-b-2 transition-colors ${
                  !isSignUp
                    ? "text-slate-900 border-indigo-600 bg-white font-semibold"
                    : "text-gray-600 border-transparent hover:text-slate-900"
                }`}
                onClick={() => !isSignUp || toggleForm()}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`w-1/2 py-4 px-1 text-center border-b-2 transition-colors ${
                  isSignUp
                    ? "text-slate-900 border-indigo-600 bg-white font-semibold"
                    : "text-gray-600 border-transparent hover:text-slate-900"
                }`}
                onClick={() => isSignUp || toggleForm()}
              >
                Sign Up
              </button>
            </nav>

            <div className="p-8">
              {/* Title Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-slate-900">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-gray-600">
                  {isSignUp
                    ? "Sign up to join your organization"
                    : "Sign in to access your employee dashboard"}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-col space-y-4 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full shadow-sm"
                >
                  <span className="bg-white p-1 rounded-full mr-3">
                    <FcGoogle className="text-xl" />
                  </span>
                  <span className="font-medium text-gray-800">
                    Continue with Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center py-3 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors w-full shadow-sm"
                >
                  <FaGithub className="text-xl mr-3" />
                  <span className="font-medium">Continue with GitHub</span>
                </button>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-600 text-sm">
                  or continue with email
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    {/* Mobile Number Field */}
                    <div className="mb-4">
                      <label className="flex items-center mb-2 text-sm font-medium text-gray-800">
                        <FaPhone className="mr-2 text-gray-600" />
                        Mobile Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          onBlur={validateMobile}
                          placeholder="+1 (234) 567-8900"
                          className={`w-full px-4 py-3 bg-gray-50 border ${
                            mobileError ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900`}
                          required
                        />
                      </div>
                      {mobileError && (
                        <p className="mt-1 text-sm text-red-500">
                          {mobileError}
                        </p>
                      )}
                    </div>

                    {/* Full Name Field */}
                    <div className="mb-4">
                      <label className="flex items-center mb-2 text-sm font-medium text-gray-800">
                        <FaUser className="mr-2 text-gray-600" />
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-800">
                    <FaEnvelope className="mr-2 text-gray-600" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="flex items-center mb-2 text-sm font-medium text-gray-800">
                    <FaLock className="mr-2 text-gray-600" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Strength Meter (only on signup) */}
                  {isSignUp && (
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          Password strength
                        </span>
                        <span
                          className="text-xs font-medium capitalize"
                          style={{
                            color:
                              passwordStrength.score <= 1
                                ? "#ef4444"
                                : passwordStrength.score === 2
                                ? "#f59e0b"
                                : "#10b981",
                          }}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="h-1 w-full rounded-full"
                            style={{
                              backgroundColor:
                                i < passwordStrength.score
                                  ? passwordStrength.score <= 1
                                    ? "#ef4444"
                                    : passwordStrength.score === 2
                                    ? "#f59e0b"
                                    : "#10b981"
                                  : "#e5e7eb",
                            }}
                          ></div>
                        ))}
                      </div>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1">
                        <li
                          className={`flex items-center ${
                            /[A-Z]/.test(formData.password)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          <span className="mr-1">•</span> One uppercase letter
                        </li>
                        <li
                          className={`flex items-center ${
                            /[0-9]/.test(formData.password)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          <span className="mr-1">•</span> One number
                        </li>
                        <li
                          className={`flex items-center ${
                            /[^A-Za-z0-9]/.test(formData.password)
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          <span className="mr-1">•</span> One special character
                        </li>
                        <li
                          className={`flex items-center ${
                            formData.password.length >= 8
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          <span className="mr-1">•</span> At least 8 characters
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {!isSignUp ? (
                  // Remember me and Forgot password (only on sign in)
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                ) : (
                  // Terms checkbox (only on sign up)
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
                >
                  {isSignUp ? "Create Account" : "Sign In"}
                </button>
              </form>

              {/* Form toggle for mobile */}
              <p className="text-center mt-6 text-sm text-gray-700 md:hidden">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-indigo-600 to-violet-500 flex-col items-center justify-center text-white p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-800/90 to-violet-700/80 z-10"></div>
          {/* Background pattern */}
          <svg
            className="absolute top-0 left-0 w-full h-full opacity-10 z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="z-10 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Employee Portal
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Access your workflow, track your tasks, and collaborate with your
            team in one secure platform.
          </p>
          <div className="flex flex-col space-y-6">
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Secure Access</h3>
                <p className="opacity-80">
                  Multi-factor authentication and encrypted data storage.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">
                  Real-time Updates
                </h3>
                <p className="opacity-80">
                  Stay informed with instant notifications and workflow updates.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 w-full text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;

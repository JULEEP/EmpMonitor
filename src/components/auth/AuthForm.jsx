import { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import GitHubLogin from "react-github-login";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Replace these with your actual OAuth credentials
  const GOOGLE_CLIENT_ID =
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    "your-google-client-id.apps.googleusercontent.com";
  const GITHUB_CLIENT_ID =
    process.env.REACT_APP_GITHUB_CLIENT_ID || "your-github-client-id";

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle regular form submission
  };

  // Google Auth Handlers
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Auth Success:", credentialResponse);
    // Here you would typically:
    // 1. Verify the credential with your backend
    // 2. Handle user session creation
    // 3. Redirect to dashboard or home page
  };

  const handleGoogleError = () => {
    console.log("Google Auth Failed");
    // Handle error (show error message to user)
  };

  // GitHub Auth Handlers
  const handleGitHubSuccess = (response) => {
    console.log("GitHub Auth Success:", response);
    // Handle GitHub authentication success
    // Typically you would get a code that you send to your backend
  };

  const handleGitHubFailure = (response) => {
    console.error("GitHub Auth Failed:", response);
    // Handle GitHub authentication failure
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
            </div>

            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-4 mb-6">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  render={({ onClick }) => (
                    <button
                      onClick={onClick}
                      className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
                    >
                      <FcGoogle className="text-xl mr-3" />
                      <span className="text-gray-700 font-medium">
                        {isSignUp
                          ? "Sign up with Google"
                          : "Sign in with Google"}
                      </span>
                    </button>
                  )}
                />
              </GoogleOAuthProvider>

              <GitHubLogin
                clientId={GITHUB_CLIENT_ID}
                redirectUri={window.location.origin}
                onSuccess={handleGitHubSuccess}
                onFailure={handleGitHubFailure}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                buttonText=""
              >
                <FaGithub className="text-xl mr-3 text-gray-800" />
                <span className="text-gray-700 font-medium">
                  {isSignUp ? "Sign up with GitHub" : "Sign in with GitHub"}
                </span>
              </GitHubLogin>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-10"
                    placeholder="••••••••"
                    required
                    minLength={isSignUp ? "8" : undefined}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {isSignUp && (
                  <p className="mt-1 text-xs text-gray-500">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

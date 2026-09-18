import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",
        formData
      );

      setMessage("Account created successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      console.log(response.data);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Logo + Heading */}
          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">
                S
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join SocialConnect today
            </p>

          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-green-700 text-sm text-center font-medium">
                {message}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-red-600 text-sm text-center font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
                className="w-full border border-gray-300 rounded-xl px-4 py-3
                text-gray-900 outline-none
                focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3
                text-gray-900 outline-none
                focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20
                  text-gray-900 outline-none
                  focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10
                  transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-sm font-medium text-gray-500
                  hover:text-gray-900 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-xl
              font-semibold shadow-md
              hover:bg-gray-800
              disabled:opacity-70
              disabled:cursor-not-allowed
              active:scale-[0.98]
              transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">

                  <div className="w-5 h-5 border-2 border-white
                  border-t-transparent rounded-full animate-spin">
                  </div>

                  Registering...

                </div>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          {/* Login Link */}
          <div className="mt-7 pt-6 border-t border-gray-200 text-center">

            <p className="text-gray-500 text-sm">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="inline-block mt-2 text-gray-900 font-semibold
              hover:underline"
            >
              Login to your account
            </Link>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2026 SocialConnect
        </p>

      </div>

    </div>
  );
}

export default Register;
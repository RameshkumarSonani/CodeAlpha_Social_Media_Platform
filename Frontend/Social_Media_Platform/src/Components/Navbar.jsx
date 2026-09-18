import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/login");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
      bg-white/70 backdrop-blur-xl
      border-b border-gray-200/60
      shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold text-gray-900"
          >
            Social<span className="text-blue-600">Connect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">

            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl
                  font-medium hover:bg-gray-800
                  active:scale-95 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl
                  font-medium hover:bg-gray-800
                  active:scale-95 transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-900 text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-gray-200 pt-4">

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-gray-700
                hover:bg-gray-100 hover:text-blue-600 transition"
              >
                Home
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-700
                    hover:bg-gray-100 hover:text-blue-600 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-3 rounded-xl
                    bg-gray-900 text-white
                    hover:bg-gray-800 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-gray-700
                    hover:bg-gray-100 hover:text-blue-600 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl
                    bg-gray-900 text-white
                    hover:bg-gray-800 transition"
                  >
                    Register
                  </Link>
                </>
              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
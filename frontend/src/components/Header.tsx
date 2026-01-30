import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/reducers/authReducer";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer text-indigo-400"
        >
          AI Interview Prep
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6">

          {/* Dashboard */}
          {isAuthenticated && (
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-indigo-400 transition"
            >
              Dashboard
            </button>
          )}

          {/* Auth buttons */}
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-indigo-400 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-1 rounded-md border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-red-400 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>

              {/* Profile Icon */}
              <FaUserCircle
                onClick={() => navigate("/profile")}
                className="text-2xl text-slate-400 cursor-pointer hover:text-indigo-400 transition"
                title="Profile"
              />
            </>
          )}
        </nav>

      </div>
    </header>
  );
}

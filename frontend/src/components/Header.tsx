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
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-extrabold cursor-pointer
                     bg-gradient-to-r from-indigo-400 to-purple-400
                     bg-clip-text text-transparent"
        >
          AI Interview Prep
        </h1>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm md:text-base">

          {/* Dashboard */}
          {isAuthenticated && (
            <button
              onClick={() => navigate("/dashboard")}
              className="relative group text-slate-300 hover:text-indigo-400 transition"
            >
              Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-400 transition-all group-hover:w-full" />
            </button>
          )}

          {/* Auth buttons */}
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-indigo-400 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-lg text-sm font-semibold
                           border border-indigo-500/40 text-indigo-400
                           hover:bg-indigo-500 hover:text-white
                           transition-all shadow-md shadow-indigo-500/20"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-300
                           hover:text-red-400 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>

              {/* Profile Icon */}
              <div
                onClick={() => navigate("/profile")}
                className="p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
                title="Profile"
              >
                <FaUserCircle className="text-2xl text-slate-400 hover:text-indigo-400 transition" />
              </div>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}

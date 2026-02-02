import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { loginSchema, type LoginFormData } from "../services/authSchema";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/reducers/authReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post("/auth/login", data);
      const { access_token } = response.data;

      dispatch(loginSuccess(access_token));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-4">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center">
          Welcome Back 👋
        </h2>
        <p className="text-center text-slate-400 mt-1 mb-6">
          Login to continue your AI interview preparation
        </p>

        {/* Error */}
        {error && (
          <p className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="w-full rounded-xl bg-slate-950 border border-slate-700
                           pl-11 pr-4 py-3 text-sm
                           focus:outline-none focus:border-indigo-500
                           focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-xl bg-slate-950 border border-slate-700
                           pl-11 pr-4 py-3 text-sm
                           focus:outline-none focus:border-indigo-500
                           focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-sm
                       hover:bg-indigo-500 transition-all
                       shadow-lg shadow-indigo-600/30
                       hover:shadow-indigo-500/40
                       disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer text */}
        <p className="text-center text-slate-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  );
}

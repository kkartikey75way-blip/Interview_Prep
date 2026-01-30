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

      // store token in redux
      dispatch(loginSuccess(access_token));

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Login to continue your interview prep
        </p>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-10 pr-4 py-2"
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
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 pl-10 pr-4 py-2"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-indigo-600 py-2 font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
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

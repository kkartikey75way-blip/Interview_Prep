import { Link } from "react-router-dom";
import { FaRobot, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        
        <div className="flex justify-center">
          <FaRobot className="text-indigo-500 text-6xl" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold">
          AI Powered Interview Preparation
        </h1>

        <p className="text-slate-400 text-lg">
          Practice real interview questions with AI-generated answers,
          explanations, and mock interviews.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="flex items-center gap-2 bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Get Started <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

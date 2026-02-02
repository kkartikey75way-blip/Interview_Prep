import { Link } from "react-router-dom";
import { FaRobot, FaArrowRight } from "react-icons/fa";
// import { motion } from "framer-motion"; // optional

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center px-6">
      
      {/* Background blur blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl text-center space-y-8">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-5 rounded-full bg-indigo-600/10 border border-indigo-500/30 shadow-lg">
            <FaRobot className="text-indigo-400 text-6xl drop-shadow-lg" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Interview Preparation
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-lg md:text-xl">
          Practice real interview questions with{" "}
          <span className="text-indigo-400 font-medium">
            AI-generated answers
          </span>, clear explanations, and realistic mock interviews.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            to="/login"
            className="group flex items-center gap-3 bg-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg
                       hover:bg-indigo-500 transition-all duration-300
                       shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50"
          >
            Get Started
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust text */}
        <p className="text-sm text-slate-500">
          🚀 Trusted by students & job seekers preparing for tech interviews
        </p>
      </div>
    </div>
  );
}

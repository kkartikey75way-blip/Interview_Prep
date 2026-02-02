import { useParams, useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaRobot } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";

export default function Interview() {
  // MUST match router param: /interview/:track
  const { track } = useParams<{ track: string }>();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(
    "Click Next Question to start AI interview"
  );
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const nextQuestion = async () => {
    if (!track) {
      alert("Invalid interview track");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Generate question
      const res = await api.post("/interview/generate", {
        role: track,
        difficulty: "medium",
      });

      // 2️⃣ Save history
      await api.post("/interview/history", {
        track,
        question: res.data.question,
        answer: res.data.answer,
        difficulty: "medium",
      });

      // 3️⃣ Update UI
      setQuestion(res.data.question);
      setAnswer(res.data.answer);

    } catch (err: any) {
      console.error("AI ERROR:", err.response?.data || err.message);
      alert("Failed to generate question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-6 py-12">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold capitalize mb-1">
            {track} Interview Practice
          </h1>
          <p className="text-slate-400">
            AI-generated questions with structured answers
          </p>
        </div>

        {/* Question Card */}
        <div className="mb-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/30">
              <FaQuestionCircle className="text-indigo-400 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">Interview Question</h2>
          </div>

          <p className="text-slate-200 leading-relaxed">
            {loading ? "🤖 Thinking..." : question}
          </p>
        </div>

        {/* Answer Card */}
        <div className="rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/30">
              <FaRobot className="text-indigo-400 text-xl" />
            </div>
            <h2 className="text-xl font-semibold">AI Answer</h2>
          </div>

          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {loading
              ? "✍️ Generating structured answer..."
              : answer || "Answer will appear here after the question is generated."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={nextQuestion}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-sm
                       hover:bg-indigo-500 transition-all
                       shadow-lg shadow-indigo-600/30
                       hover:shadow-indigo-500/40
                       disabled:opacity-50"
          >
            {loading ? "Loading..." : "Next Question"}
          </button>

          <button
            onClick={() => navigate(`/interview/${track}/history`)}
            className="text-sm text-indigo-400 hover:underline"
          >
            View History
          </button>
        </div>

      </div>
    </div>
  );
}

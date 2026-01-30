import { useParams } from "react-router-dom";
import { FaQuestionCircle, FaRobot } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";

export default function Interview() {
  // MUST match router param: /interview/:track
  const { track } = useParams<{ track: string }>();

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

      const res = await api.post("/interview/generate", {
        role: track,
        difficulty: "medium",
      });

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
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {track} Interview Practice
        </h1>
        <p className="text-slate-400">
          AI-generated questions and answers
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaQuestionCircle className="text-indigo-400 text-xl" />
          <h2 className="text-xl font-semibold">Interview Question</h2>
        </div>

        <p className="text-slate-200">
          {loading ? "Thinking..." : question}
        </p>
      </div>

      {/* Answer Card */}
      <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <FaRobot className="text-indigo-400 text-xl" />
          <h2 className="text-xl font-semibold">AI Answer</h2>
        </div>

        <p className="text-slate-300 leading-relaxed">
          {loading ? "Generating answer..." : answer}
        </p>
      </div>

      {/* Action */}
      <div className="mt-8">
        <button
          onClick={nextQuestion}
          disabled={loading}
          className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Next Question"}
        </button>
      </div>
    </div>
  );
}

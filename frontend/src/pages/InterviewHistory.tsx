import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

interface HistoryItem {
  id: number;
  question: string;
  answer: string;
  difficulty: string;
  created_at: string;
}

export default function InterviewHistory() {
  const { track } = useParams<{ track: string }>();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!track) return;

    api.get(`/interview/history/${track}`).then((res) => {
      setHistory(res.data);
    });
  }, [track]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {track} Interview History
      </h1>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-5 rounded-xl"
          >
            <p className="font-semibold">
              {item.question}
            </p>
            <p className="text-slate-400 mt-2 text-sm">
              {item.answer}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {new Date(item.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

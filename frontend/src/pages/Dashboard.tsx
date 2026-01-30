import { useNavigate } from "react-router-dom";
import { interviewTracks } from "../data/interviewTracks";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-slate-400 mb-8">Choose your interview track</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {interviewTracks.map((track) => {
          const Icon = track.icon;

          return (
            <div
              key={track.id}
              onClick={() => navigate(track.path)}
              className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition cursor-pointer"
            >
              <Icon className="text-indigo-400 text-3xl mb-4" />
              <h3 className="text-xl font-semibold">{track.title}</h3>
              <p className="text-slate-400 text-sm">
                {track.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

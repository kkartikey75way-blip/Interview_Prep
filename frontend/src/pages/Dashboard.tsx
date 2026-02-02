import { useNavigate } from "react-router-dom";
import { interviewTracks } from "../data/interviewTracks";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-6 py-12">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            Dashboard
          </h1>
          <p className="text-slate-400">
            Choose your interview track and start practicing
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interviewTracks.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                onClick={() => navigate(track.path)}
                className="group cursor-pointer rounded-2xl bg-slate-900/80 backdrop-blur-xl
                           border border-white/10 p-6 shadow-xl
                           hover:-translate-y-1 hover:shadow-indigo-600/30
                           transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-5 inline-flex p-3 rounded-xl bg-indigo-600/10 border border-indigo-500/30">
                  <Icon className="text-indigo-400 text-3xl" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-1 group-hover:text-indigo-400 transition">
                  {track.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {track.description}
                </p>

                {/* CTA hint */}
                <div className="mt-4 text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                  Start Practice →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

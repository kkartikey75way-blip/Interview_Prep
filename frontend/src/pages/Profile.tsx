import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/me")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("Profile fetch failed:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white px-6 py-12">

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative max-w-xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-indigo-600/10 border border-indigo-500/30">
              <FaUserCircle className="text-6xl text-indigo-400" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 text-sm">
            <ProfileRow label="User ID" value={user.id} />
            <ProfileRow label="Name" value={user.name} />
            <ProfileRow label="Email" value={user.email} />

            <div className="flex justify-between items-center">
              <span className="text-slate-400">Status</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium
                  ${
                    user.is_active
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

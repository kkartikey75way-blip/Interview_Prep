import { useEffect, useState } from "react";
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
    return <div className="text-white p-6">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-slate-800 p-6 rounded-xl space-y-3">
        <p><b>ID:</b> {user.id}</p>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Status:</b> {user.is_active ? "Active" : "Inactive"}</p>
      </div>
    </div>
  );
}

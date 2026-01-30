import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

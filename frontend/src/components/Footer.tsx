export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm">
          © {new Date().getFullYear()} AI Interview Prep. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm">
          <span className="hover:text-indigo-400 cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-indigo-400 cursor-pointer">
            Terms
          </span>
          <span className="hover:text-indigo-400 cursor-pointer">
            Contact
          </span>
        </div>

      </div>
    </footer>
  );
}

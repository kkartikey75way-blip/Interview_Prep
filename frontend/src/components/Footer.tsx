export default function Footer() {
  return (
    <footer className="relative w-full backdrop-blur-lg bg-slate-900/80 text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
            AI Interview Prep
          </span>
          . All rights reserved.
        </p>

        {/* Right links */}
        <div className="flex gap-6 text-sm">
          {["Privacy Policy", "Terms", "Contact"].map((item) => (
            <span
              key={item}
              className="relative cursor-pointer hover:text-indigo-400 transition group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-400 transition-all group-hover:w-full" />
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
}

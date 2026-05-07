import { CircleUserRound, RotateCw } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-3 py-2 w-full h-10 fixed top-0 uppercase font-medium z-50 border-b border-gray-400">
      <div className="flex items-center gap-4">
        <span>Ping</span>
        <div className="h-4 bg-gray-400 w-px"></div>
        <nav className="flex gap-4 ">
          <a
            href="#"
            className="text-blue-500 border-b-2 border-b-blue-500 h-10 flex items-center"
          >
            Overview
          </a>
          <a
            href="#"
            className="border-b-2 border-b-blue-500 h-10 flex items-center"
          >
            incidents
          </a>
          <a
            href="#"
            className="border-b-2 border-b-blue-500 h-10 flex items-center"
          >
            Logs
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <span className="lowercase text-sm">v1.0.0-stable</span>
        <button>
          <RotateCw size={20} />
        </button>
        <div className="">
          <span>
            <CircleUserRound />
          </span>
        </div>
      </div>
    </header>
  );
}

import {
  BellRing,
  LayoutDashboard,
  MonitorCog,
  Settings,
  Target,
} from "lucide-react";

export default function Aside() {
  return (
    <aside className="fixed left-0 top-10 h-[calc(100%-40px)] w-20 flex flex-col z-40 bg-gray-900 border-r border-gray-700">
      <nav>
        <a
          href="#"
          className="text-gray-400 flex flex-col items-center justify-center py-4 gap-1 hover:bg-[#1C2126] hover:text-gray-200 transition-none"
        >
          <LayoutDashboard size={20} />
          <span>Dash</span>
        </a>
        <a
          href="#"
          className="text-gray-500 flex flex-col items-center justify-center py-4 gap-1 hover:bg-[#1C2126] hover:text-gray-200 transition-none"
        >
          <Target size={20} />
          <span>Targets</span>
        </a>
        <a
          href="#"
          className="text-gray-500 flex flex-col items-center justify-center py-4 gap-1 hover:bg-[#1C2126] hover:text-gray-200 transition-none"
        >
          <BellRing size={20} />
          <span>Alerts</span>
        </a>
        <a
          href="#"
          className="text-gray-500 flex flex-col items-center justify-center py-4 gap-1 hover:bg-[#1C2126] hover:text-gray-200 transition-none"
        >
          <MonitorCog size={20} />
          <span>System</span>
        </a>
      </nav>
      <div className="pb-4 mt-auto">
        <a
          href="#"
          className="text-gray-500 flex flex-col items-center justify-center py-4 gap-1 hover:bg-[#1C2126] hover:text-gray-200"
        >
          <Settings size={20} />
        </a>
      </div>
    </aside>
  );
}

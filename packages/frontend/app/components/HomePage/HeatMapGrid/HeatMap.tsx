"use client";

export default function HeatMapGridUI() {
  return (
    <section className="border border-gray-700 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2>Target Heatmap</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500"></span>
            <span className="text-[10px] uppercase text-gray-500">Online</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500/20 border border-red-500"></span>
            <span className="text-[10px] uppercase text-gray-500">Offline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-gray-500/20 border border-gray-500"></span>
            <span className="text-[10px] uppercase text-gray-500">muted</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="w-8 aspect-square bg-emerald-500/10 border border-emerald-500/30"
          ></div>
        ))}
      </div>
    </section>
  );
}

"use client";

export default function OverviewUI() {
  return (
    <div className="flex justify-between items-end mb-6">
      <div className="">
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-sm text-gray-900">
          Real time Target analytics overview
        </p>
      </div>
      <div className="flex items-center gap-2 text-gray-500 px-3 bg-gray-950 py-1.5 border border-gray-700">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Last updated at 10:00 AM
      </div>
    </div>
  );
}

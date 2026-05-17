"use client";

import { ListFilter, Plus, SearchIcon } from "lucide-react";

export default function TargetTableUI() {
  return (
    <section className="bg-[#15191C] border border-[#2D333B]">
      <div className="p-4 border-b border-[#2D333B] flex justify-between items-center">
        <div className="flex items-center bg-[#0B0E11] border border-[#2D333B] px-3 py-1.5 w-72">
          <SearchIcon size={15} color="white" className="mr-2" />
          <input
            type="text"
            placeholder="filter targets..."
            className="bg-transparent border-none p-0 text-mono-code focus:ring-0 text-white placeholder-gray-600 w-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="text-xs text-white border border-gray-950 py-1.5 px-3 flex items-center gap-2">
            <ListFilter size={15} />
            Filter
          </button>
          <button className="text-xs text-white border border-gray-950 py-1.5 px-3 flex items-center gap-2">
            <Plus size={15} />
            Add Target
          </button>
        </div>
      </div>

      {/* table */}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#0B0E11] text-label-caps text-gray-500 border-b border-[#2D333B]">
            <th className="px-4 py-3 font-bold uppercase tracking-widest">
              Target Name
            </th>
            <th className="px-4 py-3 font-bold uppercase tracking-widest">
              URL
            </th>
            <th className="px-4 py-3 font-bold uppercase tracking-widest">
              Active
            </th>
            <th className="px-4 py-3 font-bold uppercase tracking-widest text-right">
              Interval
            </th>
            <th className="px-4 py-3 font-bold uppercase tracking-widest">
              Last Checked
            </th>
            <th className="px-4 py-3 font-bold uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
}

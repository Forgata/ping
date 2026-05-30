"use client";

import { ITarget } from "@backend/modules/targets/target.model";
import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Plus,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

interface TargetTableUIProps {
  targets: ITarget[];
}

export default function TargetTableUI({ targets }: TargetTableUIProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalTargets = targets.length;
  const totalPages = Math.ceil(totalTargets / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTargets = targets.slice(startIndex, endIndex);

  function handlePageIncrement(page: number) {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }
  function handlePageDecrement(page: number) {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

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
        <tbody>
          {currentTargets.map((target, index) => (
            <tr key={index} className="border-b border-[#2D333B]">
              <td className="px-4 py-3">{target.name}</td>
              <td className="px-4 py-3">{target.url}</td>
              <td className="px-4 py-3">{target.active ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-right">{target.intervalSeconds}</td>
              <td className="px-4 py-3">
                {target.lastCheckedAt?.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-xs text-white border border-gray-950 py-1.5 px-3">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 bg-[#15191C] border-t border-[#2D333B] flex justify-between items-center">
        <p className="text-[10px] text-gray-600 uppercase">
          Showing {currentPage} of {totalPages} pages
        </p>
        <div className="flex gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center border border-[#2D333B] hover:bg-[#1C2126] text-gray-500 disabled:opacity-30"
            onClick={() => handlePageDecrement(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined text-[16px]">
              <ChevronLeft />
            </span>
          </button>
          <button className="w-7 h-7 flex items-center justify-center border border-blue-500 bg-blue-500/10 text-blue-400 text-[10px] font-bold">
            {currentPage}
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center border border-[#2D333B] hover:bg-[#1C2126] text-gray-500 disabled:opacity-30"
            onClick={() => handlePageIncrement(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="material-symbols-outlined text-[16px]">
              <ChevronRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

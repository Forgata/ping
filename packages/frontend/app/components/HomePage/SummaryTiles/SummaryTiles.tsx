"use client";

export default function SummaryTilesUI() {
  return (
    <div className="grid grid-col-1 md:grid-cols-5 gap-px bg-gray-950 mb-6">
      <div className="bg-gray-800 p-4">
        <p className="font-semibold capitalize">Total Targets</p>
        <div className="flex items-baseline gap-2">
          <span>24</span>
          <span>Nodes</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Up count</p>
        <div className="flex items-baseline gap-2">
          <span>22</span>
          <span>91.66%</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Down Count</p>
        <div className="flex items-baseline gap-2">
          <span>2</span>
          <span>Critical</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Avg Latency</p>
        <div className="flex items-baseline gap-2">
          <span>48</span>
          <span>ms</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Active Alerts</p>
        <div className="flex items-baseline gap-2">
          <span>2</span>
          <span>Unresolved</span>
        </div>
      </div>
    </div>
  );
}

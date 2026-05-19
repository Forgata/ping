"use client";
interface SummaryTileProps {
  UpCountStatus: {
    upCount: number;
    percentage: number;
  };
  downCount: number;
  activeAlerts: number;
  targets: number;
}
export default function SummaryTilesUI({
  UpCountStatus,
  downCount,
  activeAlerts,
  targets,
}: SummaryTileProps) {
  return (
    <div className="grid grid-col-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800 p-4">
        <p className="font-semibold capitalize">Total Targets</p>
        <div className="flex items-baseline gap-2">
          <span>{targets}</span>
          <span>Nodes</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Up count</p>
        <div className="flex items-baseline gap-2">
          <span>{UpCountStatus.upCount}</span>
          <span>{UpCountStatus.percentage.toFixed(2)}%</span>
        </div>
      </div>
      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Down Count</p>
        <div className="flex items-baseline gap-2">
          <span>{downCount}</span>
          <span>Critical</span>
        </div>
      </div>

      <div className="bg-gray-800 p-4 border border-gray-950">
        <p className="font-semibold capitalize">Active Alerts</p>
        <div className="flex items-baseline gap-2">
          <span>{activeAlerts}</span>
          <span>Unresolved</span>
        </div>
      </div>
    </div>
  );
}

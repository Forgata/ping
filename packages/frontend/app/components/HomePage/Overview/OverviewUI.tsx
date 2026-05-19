"use client";

import { ISystemStatus } from "@backend/modules/system/system.model";
import { fetchData, FetchData } from "@utils/fetch";
import useSWR from "swr";

export default function OverviewUI() {
  const { data, error, isLoading } = useSWR<FetchData<ISystemStatus>>(
    "http://localhost:3001/api/system/status",
    fetchData,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true,
    },
  );

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
        <LastCycleAt data={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}

function LastCycleAt({
  data,
  error,
  isLoading,
}: {
  data?: FetchData<ISystemStatus>;
  error: unknown;
  isLoading: boolean;
}) {
  if (isLoading) {
    return "Loading...";
  }

  if (error || !data) {
    return `Error fetching data: ${error}`;
  }

  return `Last cycle at ${new Date(data.data.lastCycleAt!).toLocaleTimeString()}`;
}

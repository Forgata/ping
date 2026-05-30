import { fetchData } from "@utils/fetch";
import HeatMapGridUI from "./HeatMap";
import { ITarget } from "@modules/targets/target.model";
import { IAlert } from "@modules/alerts/alert.model";
import { ChartConfig } from "@/components/ui/chart";

export default async function HeatMapGridContainer() {
  const { data: targets } = await fetchData<ITarget[]>(
    "http://localhost:3001/api/targets",
  );
  const { data: alerts } = await fetchData<IAlert[]>(
    "http://localhost:3001/api/alerts",
  );
  const activeAlerts =
    alerts?.filter((alert) => alert.status === "active").length || 0;
  const upCount = targets.length - activeAlerts;

  const chartData = [
    { name: "Up", value: upCount, fill: "var(--color-Up)" },
    { name: "Down", value: activeAlerts, fill: "var(--color-Down)" },
  ];

  const chartConfig = {
    Up: {
      label: "Up",
      color: "oklch(62.3% 0.214 259.815)",
    },
    Down: {
      label: "Down",
      color: "oklch(63.7% 0.237 25.331)",
    },
  } satisfies ChartConfig;

  return (
    <HeatMapGridUI
      upCount={upCount}
      activeAlerts={activeAlerts}
      chartData={chartData}
      chartConfig={chartConfig}
    />
  );
}

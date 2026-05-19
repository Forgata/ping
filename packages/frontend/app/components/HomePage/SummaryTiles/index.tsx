import { fetchData } from "@utils/fetch";
import SummaryTilesUI from "./SummaryTiles";
import { ITarget } from "@modules/targets/target.model";
import { IAlert } from "@modules/alerts/alert.model";

export default async function SummaryTilesContainer() {
  const { data: targets } = await fetchData<ITarget[]>(
    "http://localhost:3001/api/targets",
  );

  const { data: alerts } = await fetchData<IAlert[]>(
    "http://localhost:3001/api/alerts",
  );

  const activeAlerts =
    alerts?.filter((alert) => alert.status === "active").length || 0;

  const upCountStatus = {
    upCount: targets.length - activeAlerts,
    percentage:
      activeAlerts > 0
        ? ((targets.length - activeAlerts) / targets.length) * 100
        : 100,
  };

  const downCount = alerts.filter(
    (alert) => alert.message === "Service is down",
  ).length;

  return (
    <SummaryTilesUI
      targets={targets.length || 0}
      activeAlerts={activeAlerts}
      downCount={downCount}
      UpCountStatus={upCountStatus}
    />
  );
}

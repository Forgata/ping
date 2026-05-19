import { fetchData } from "@utils/fetch";
import HeatMapGridUI from "./HeatMap";
import { ITarget } from "@backend/modules/targets/target.model";
import { IAlert } from "@backend/modules/alerts/alert.model";

export default async function HeatMapGridContainer() {
  const { data: targets } = await fetchData<ITarget[]>("/api/targets");
  const { data: alerts } = await fetchData<IAlert[]>(
    "http://localhost:3001/api/alerts",
  );
  const activeAlerts =
    alerts?.filter((alert) => alert.status === "active").length || 0;
  const upCount = targets.length - activeAlerts;

  return <HeatMapGridUI />;
}

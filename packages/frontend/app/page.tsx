import HeatMapGrid from "./components/HomePage/HeatMapGrid";
import Overview from "./components/HomePage/Overview";
import SummaryTiles from "./components/HomePage/SummaryTiles";
import TargetTable from "./components/HomePage/TargetTable";

export default function Home() {
  return (
    <>
      <Overview />
      <SummaryTiles />
      {/* <HeatMapGrid /> */}
      <TargetTable />
    </>
  );
}

import { fetchData } from "@utils/fetch";
import TargetTableUI from "./TargetTable";
import { ITarget } from "@backend/modules/targets/target.model";
export default async function TargetTableContainer() {
  const { data: targets } = await fetchData<ITarget[]>(
    "http://localhost:3001/api/targets",
  );

  return <TargetTableUI targets={targets} />;
}

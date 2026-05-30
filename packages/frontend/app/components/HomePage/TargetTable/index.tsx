import { fetchData } from "@utils/fetch";
import TargetTableUI from "./TargetTable";
import { ITarget } from "@backend/modules/targets/target.model";

// interface TargetPageProps {
//   searchParams: Promise<{ page?: string }>;
// }
export default async function TargetTableContainer() {
  const { data: targets } = await fetchData<ITarget[]>(
    "http://localhost:3001/api/targets",
  );

  // const params = await searchParams;
  // const currentPage = Number(params.page) || 1;

  return <TargetTableUI targets={targets} />;
}

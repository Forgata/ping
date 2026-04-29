import type { ICheck } from "../check.model.js";

export const getUptime = (targets: ICheck[]) => {
  const successCount = targets.filter((target) => target.success).length;
  const totalCount = targets.length;
  const uptime = (successCount / totalCount) * 100;
  return { totalCount, uptime };
};

export const avgLatency = (targets: ICheck[]) => {
  const totalLatency = targets.reduce(
    (acc, target) => acc + target.latencyMs,
    0,
  );
  const avgLatency = totalLatency / targets.length;
  return avgLatency;
};

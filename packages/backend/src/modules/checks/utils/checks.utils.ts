import type { ICheck } from "../check.model.js";

export const getUptime = (targets: ICheck[]) => {
  const successCount = targets.filter((target) => target.success).length;
  const totalCheckCount = targets.length;
  const uptime = (successCount / totalCheckCount) * 100;
  return { totalCheckCount, uptime };
};

export const getLatency = (targets: ICheck[]) => {
  const totalLatency = targets.reduce(
    (acc, target) => acc + target.latencyMs,
    0,
  );
  const avgLatency = totalLatency / targets.length;
  return avgLatency;
};

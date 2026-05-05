import { scheduler } from "../scheduler/check.scheduler.js";

export const getSystemStatus = async () => {
  const status = await scheduler.getStatus();
  return status;
};

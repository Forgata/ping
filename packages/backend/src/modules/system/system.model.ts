export interface ISystemStatus {
  isRunning: boolean;
  lastCycleAt: Date | null;
  activeTargets: number;
  checksInProgress: number;
}

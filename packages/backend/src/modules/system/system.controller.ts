import type { Request, Response, NextFunction } from "express";
import { getSystemStatus } from "./system.service.js";

export const statusGET = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getSystemStatus();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

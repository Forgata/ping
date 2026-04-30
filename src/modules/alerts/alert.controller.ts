import type { Request, Response, NextFunction } from "express";
import { getAlerts } from "./alert.service.js";

export const alertGET = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAlerts();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

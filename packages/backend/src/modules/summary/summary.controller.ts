import type { Request, Response, NextFunction } from "express";
import type { SummaryParams } from "./summary.schema.js";
import { getSummary } from "./summary.service.js";

export const summaryGet = async (
  req: Request<SummaryParams, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await getSummary(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

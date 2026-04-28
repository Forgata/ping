import { type NextFunction, type Request, type Response } from "express";
import { createTarget, removeTarget, getTargets } from "./target.service.js";
import type { CreateTargetInput, DeleteTargetParams } from "./target.schema.js";

export const create = async (
  req: Request<{}, {}, CreateTargetInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await createTarget(req.body);
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getTargetController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getTargets();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request<DeleteTargetParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("ID is required");

    const result = await removeTarget(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Target not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

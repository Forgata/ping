import type { Request, Response, NextFunction } from "express";
import { ZodArray, ZodError, ZodObject, ZodOptional } from "zod";

export function validate(schema: ZodObject | ZodArray | ZodOptional<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          error: error.message,
        });
      }
      next(error);
    }
  };
}

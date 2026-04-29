import z from "zod";

export const checkTargetSchema = z.object({
  params: z.object({ id: z.string() }),
});
export type CheckTargetParams = z.infer<typeof checkTargetSchema.shape.params>;
export type CheckTargetInput = { params: CheckTargetParams };

import z from "zod";

export const createTargetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.url("Invalid URL format"),
  intervalSeconds: z
    .number()
    .int()
    .positive("Interval must be a positive integer"),
});

export type CreateTargetInput = z.infer<typeof createTargetSchema>;

export const deleteTargetSchema = z.object({
  params: z.object({ id: z.string().length(24, "Invalid target ID") }),
});

export type DeleteTargetParams = z.infer<
  typeof deleteTargetSchema.shape.params
>;
export type DeleteTargetInput = { params: DeleteTargetParams };

import z from "zod";

export const summarySchema = z.object({
  params: z.object({ id: z.string().length(24, "Invalid target ID") }),
});

export type SummaryParams = z.infer<typeof summarySchema.shape.params>;

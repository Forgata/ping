import type { ITarget } from "./target.model.js";
import Target from "./target.model.js";

type CreateTargetInput = Pick<ITarget, "name" | "url" | "intervalSeconds">;

export const createTarget = async ({
  name,
  url,
  intervalSeconds,
}: CreateTargetInput) => {
  const normalisedUrl = url.trim();
  const normalisedName = name.trim();

  let existingTarget: boolean | null;

  try {
    existingTarget = await Target.findOne({ name: normalisedName });
  } catch (err) {
    throw new Error("Failed to check existing target");
  }

  if (existingTarget)
    throw new Error("Target with the same name already exists");

  // checking if target exists
  try {
    await Target.create({
      name: normalisedName,
      url: normalisedUrl,
      intervalSeconds,
    });
  } catch (err) {
    throw new Error("Failed to create target");
  }

  return {
    name: normalisedName,
    url: normalisedUrl,
    intervalSeconds,
  };
};

export const getTargets = async () => {
  const targets = await Target.find().lean();
  return targets;
};

export const removeTarget = async (id: string) => {
  try {
    const removedTarget = await Target.findByIdAndDelete(id);
    return removedTarget;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to remove target");
  }
};

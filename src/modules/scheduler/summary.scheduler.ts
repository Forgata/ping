// import Check from "../checks/check.model.js";
// import { createSummary } from "../summary/summary.service.js";

// export const summaryScheduler = async () => {
//   try {
//     const checks = await Check.distinct("targetId");

//     if (checks.length > 0) {
//       await Promise.allSettled(
//         checks.map((id) => createSummary(id.toString())),
//       );
//       console.log(`Summaries updated for ${checks.length} targets`);
//     } else {
//       console.log("No checks found");
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to run summary");
//   } finally {
//     setTimeout(summaryScheduler, 10000);
//   }
// };

import { Router } from "express";

const checkRouter = Router();

checkRouter.post("/targets/:id/run");
checkRouter.get("/targets/:id/checks");
checkRouter.get("/targets/:id/summary");

export default checkRouter;

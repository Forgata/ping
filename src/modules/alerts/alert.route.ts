import { Router } from "express";
import { alertGET } from "./alert.controller.js";

const alertRouter = Router();

alertRouter.get("/alerts", alertGET);
export default alertRouter;

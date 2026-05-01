import { Router } from "express";
import { statusGET } from "./system.controller.js";

const systemRouter = Router();

systemRouter.get("/system/status", statusGET);

export default systemRouter;

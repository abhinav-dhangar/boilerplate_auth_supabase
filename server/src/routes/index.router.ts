import express from "express";
import { helloworldRouter } from "./helloworld.route";
import { authRouter } from "./auth.route";

const router = express.Router();

router.use("/", helloworldRouter);
router.use("/auth", authRouter);
export { router };

import express from "express";
import groupRoutes from "./groupRoutes.js";

const router = express.Router();

router.use("/groups", groupRoutes);

export default router;

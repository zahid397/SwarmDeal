import express from "express";
import { createGroup, getGroups } from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);

export default router;

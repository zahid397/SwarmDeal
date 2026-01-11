import express from "express";
import GroupController from "../controllers/groupController.js";

const router = express.Router();

router.post("/", GroupController.createGroup);
router.get("/", GroupController.getGroups);

export default router;

import express from "express";
import LogController from "../controllers/log-controller.js";
const router = express.Router();

router.post("/addRestLog", LogController.newRestLog);
router.post("/addSoapLog", LogController.newSoapLog);

export default router;

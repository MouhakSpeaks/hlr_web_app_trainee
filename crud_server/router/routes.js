import express from "express";
const router = express.Router();
import DataController from "../controllers/controller.js";

router.post("/new-data", DataController.postData);
router.get("/all-data", DataController.getAllData);
router.get("/data/:imsi", DataController.getDataByImsi);
router.get("/get-data-by-msisdn/:msisdn", DataController.getDataByMsisdn);
router.get("/get-data-by-imsi", DataController.getSelectiveDataByImsi);
router.put("/update-data/:imsi", DataController.updateDataByImsi);
router.delete("/delete-data/:imsi", DataController.deleteDataByImsi);
router.put("/delete/:imsi", DataController.deleteData);

export default router;

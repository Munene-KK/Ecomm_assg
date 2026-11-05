import express from "express";
import {
  activateAdmin,
  deleteAdmin,
  suspendAdmin,
} from "../../controllers/admin.controllers/monitorAdmin.controller";
const router = express.Router();
router.patch("/suspend/:id", suspendAdmin);
router.patch("/activate/:id", activateAdmin);
router.delete("/delete/:id", deleteAdmin);
export const monitorAdminRoute = router;

import express from "express";
import {
  createAdmin,
  getAdmins,
} from "../../controllers/admin.controllers/manageAdmin.controller";
const router = express.Router();
router.get("/", getAdmins);
router.post("/create", createAdmin);
export const manageAdminRoute = router;

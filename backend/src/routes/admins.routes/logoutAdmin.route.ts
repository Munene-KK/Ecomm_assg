import express from "express";
import { logoutAdmin } from "../../controllers/admin.controllers/logoutAdmin.controller";
const router = express.Router();
router.post("/", logoutAdmin);

export const logoutAdminRoute = router;

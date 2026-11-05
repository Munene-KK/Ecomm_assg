import express from "express";
import { loginAdmin } from "../../controllers/admin.controllers/loginAdmin.controller";
const router = express.Router();
router.post("/", loginAdmin);
export const loginAdminRoute = router;

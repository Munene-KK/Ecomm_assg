import express from "express";
import { refreshAdminToken } from "../../controllers/jwt.controllers/refreshAdminToken.controller";
const router = express.Router();
router.get("/", refreshAdminToken);
export const refreshAdminTokenRoute = router;

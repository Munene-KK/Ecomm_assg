import express from "express";
import { getAdminOrders } from "../../controllers/admin.controllers/getAdminOrders.controller";
import { verifyJWT } from "../../middleware/jwt/verifyJWT.jwt.middleware";

const router = express.Router();

router.get("/", verifyJWT, getAdminOrders);

export const adminOrdersRoute = router;

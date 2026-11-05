import express from "express";
import { checkoutOrder, getUserOrders } from "../controllers/orders.controller";

const router = express.Router();

router.post("/checkout", checkoutOrder);
router.get("/user/:userID", getUserOrders);

export const ordersRoute = router;

import express from "express";
import { getUserOrders } from "../../controllers/orders.controller";
import { updateUserProfile } from "../../controllers/users.controllers/updateUser.controller";

const router = express.Router();

router.patch("/:userID", updateUserProfile);
router.get("/:userID/orders", getUserOrders);

export const userProfileRoute = router;

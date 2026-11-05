import express from "express";
import {
  addToCart,
  removeFromCart,
} from "../../controllers/users.controllers/cart.controllers";
const router = express.Router();

router.patch("/:userID", addToCart);
router.delete("/:userID/:productID", removeFromCart);
export const userCartRoute = router;

import express from "express";
import { updateProduct } from "../../controllers/products.controllers/updateProducts.controller";
const router = express.Router();
router.patch("/:id", updateProduct);
export const updateproductRoute = router;

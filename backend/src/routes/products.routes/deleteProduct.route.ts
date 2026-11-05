import express from "express";
import { deleteProduct } from "../../controllers/products.controllers/deleteProduct.controller";
const router = express.Router();
router.delete("/:id", deleteProduct);
export const deleteproductRoute = router;

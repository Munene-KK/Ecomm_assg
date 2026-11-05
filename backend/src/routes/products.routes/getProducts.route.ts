import express from "express";
import {
  getProduct,
  getProducts,
} from "../../controllers/products.controllers/getProducts.controller";
const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);

export const getProductsRoute = router;

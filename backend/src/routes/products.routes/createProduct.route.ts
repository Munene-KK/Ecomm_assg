import express from "express";
import { createProduct } from "../../controllers/products.controllers/createPoducts.controller";
const router = express.Router();
router.post("/", createProduct);
export const createProductRoute = router;

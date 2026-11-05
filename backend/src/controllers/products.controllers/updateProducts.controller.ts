import mongoose from "mongoose";
import type { Request, Response } from "express";
import { Product } from "../../model/products.model";
import type { ProductsObjUpdate } from "../../types/types";

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    price,
    image,
    description,
    category,
    status,
  }: ProductsObjUpdate = req.body;

  if (!id) {
    return res.status(400).json({ error: "No product id passed" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const updatedProduct = { name, price, image, description, category, status };
  const product = await Product.findByIdAndUpdate(id, updatedProduct, {
    runValidators: true,
    new: true,
  });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(product);
};

import mongoose from "mongoose";
import type { Request, Response } from "express";
import { Product } from "../../model/products.model";

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  //null or undefined id
  if (!id) {
    return res.status(400).json({ error: "No product id passed" });
  }
  //invalid id
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json({ success: "Product deleted" });
};

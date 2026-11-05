import { Product } from "../../model/products.model";
import mongoose from "mongoose";
import type { Request, Response } from "express";

//get all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  if (!products || !products.length) {
    return res.status(200).json({ sucess: "No products added yet" });
  }
  res.status(200).json(products);
};

//get one product
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  //null or undefined id
  if (!id) {
    return res.status(400).json({ error: "No product id passed" });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({ error: "Product does not exist" });
  }
  res.status(200).json(product);
};

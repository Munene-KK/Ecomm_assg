import type { Request, Response } from "express";
import { Product } from "../../model/products.model";
import type { ProductsObj } from "../../types/types";
//product types

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, image, description, category }: ProductsObj = req.body;
  if (
    !name?.trim() ||
    !price ||
    !image?.trim() ||
    !description?.trim() ||
    !category?.trim()
  ) {
    return res.status(400).json({ error: "All properties must be filled" });
  }
  //create the new product
  try {
    const product = { name, price, image, description, category };
    await Product.create(product);
    res.status(201).json({ success: "Product has been created" });
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
  }
};

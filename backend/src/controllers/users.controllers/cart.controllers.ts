import { type Response, type Request } from "express";
import mongoose from "mongoose";
import { User } from "../../model/users.model";
import { Product } from "../../model/products.model";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { productID, quantity = 1 } = req.body;

    if (!productID) {
      return res.status(400).json({ error: "productID is required!" });
    }
    if (
      !mongoose.isValidObjectId(userID) ||
      !mongoose.isValidObjectId(productID)
    ) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive integer" });
    }

    const productExists = await Product.exists({ _id: productID });
    if (!productExists) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 1. already in cart? bump the quantity
    let user = await User.findOneAndUpdate(
      { _id: userID, "shoppingCart.product": productID },
      { $inc: { "shoppingCart.$.quantity": quantity } },
      { new: true },
    );

    // 2. otherwise push a new item
    if (!user) {
      user = await User.findByIdAndUpdate(
        userID,
        { $push: { shoppingCart: { product: productID, quantity } } },
        { new: true },
      );
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ shoppingCart: user.shoppingCart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userID, productID } = req.params;

    if (
      !mongoose.isValidObjectId(userID) ||
      !mongoose.isValidObjectId(productID)
    ) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const user = await User.findByIdAndUpdate(
      userID,
      { $pull: { shoppingCart: { product: productID } } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ shoppingCart: user.shoppingCart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

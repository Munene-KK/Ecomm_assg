import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../model/users.model";
import { Order } from "../model/orders.model";
import { sendOrderConfirmationEmail } from "../config/email.config";

export const checkoutOrder = async (req: Request, res: Response) => {
  try {
    const { userID, shipping = {} } = req.body;

    if (!userID || !mongoose.isValidObjectId(userID)) {
      return res.status(400).json({ error: "Valid user ID is required" });
    }

    const user = await User.findById(userID).populate("shoppingCart.product");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validCartItems = user.shoppingCart.filter(
      (item) => item.product && typeof item.product === "object",
    );

    if (!validCartItems.length) {
      return res.status(400).json({ error: "Your cart is empty" });
    }

    const items = validCartItems.map((item) => {
      const product = item.product as unknown as {
        _id: string;
        name: string;
        price: number;
        image: string;
      };

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      };
    });

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: user._id,
      email: user.email,
      customerName: user.fullname,
      shipping: {
        county: shipping.county ?? user.location?.county ?? "",
        station: shipping.station ?? user.location?.station ?? "",
        phone: shipping.phone ?? user.phoneNumber ?? "",
        notes: shipping.notes ?? "",
      },
      items,
      total,
      paymentMethod: shipping.paymentMethod ?? "Cash on delivery",
    });

    await User.findByIdAndUpdate(userID, { $set: { shoppingCart: [] } });

    await sendOrderConfirmationEmail({
      userEmail: user.email,
      name: user.fullname,
      total,
      orderId: String(order._id),
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to place order" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    if (!userID || !mongoose.isValidObjectId(userID)) {
      return res.status(400).json({ error: "Valid user ID is required" });
    }

    const orders = await Order.find({ user: userID }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not load orders" });
  }
};

import type { Request, Response } from "express";
import { Admin } from "../../model/admin.model";
import { Order } from "../../model/orders.model";

export const getAdminOrders = async (req: Request, res: Response) => {
  try {
    if (!req.adminId) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const admin = await Admin.findById(req.adminId).select("role activate");
    if (!admin || admin.role !== "Administrator" || !admin.activate) {
      return res.status(403).json({ error: "Administrator access required" });
    }

    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not load orders" });
  }
};

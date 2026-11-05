import { Admin } from "../../model/admin.model";
import type { Request, Response } from "express";
import mongoose from "mongoose";
export const logoutAdmin = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.jwt;
  if (refreshToken) {
    const loggedOutAdmin = await Admin.findOneAndUpdate(
      { refreshToken },
      { status: false, refreshToken: null },
      { runValidators: true, new: true },
    );
    if (!loggedOutAdmin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    return res.status(200).json({ success: "Logged out!" });
  }
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.sendStatus(204);
};

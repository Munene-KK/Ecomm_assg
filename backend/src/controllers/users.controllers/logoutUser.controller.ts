import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../model/users.model";
export const logoutUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }
  const loggedOutUser = await User.findByIdAndUpdate(
    id,
    { active: false },
    { runValidators: true, new: true },
  );
  if (!loggedOutUser) {
    return res.status(404).json({ error: "User not found!" });
  }
  return res.status(200).json({ sucess: "User logged out!" });
};

import type { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../model/users.model";

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { fullname, email, phoneNumber, location } = req.body;

    if (!mongoose.isValidObjectId(userID)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    if (email && !(await User.findOne({ email, _id: { $ne: userID } }))) {
      // no-op when the email is unique
    }

    const duplicateEmail = email
      ? await User.findOne({ email, _id: { $ne: userID } })
      : null;

    if (duplicateEmail) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        ...(fullname ? { fullname } : {}),
        ...(email ? { email } : {}),
        ...(phoneNumber !== undefined ? { phoneNumber } : {}),
        ...(location ? { location } : {}),
      },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Could not update profile" });
  }
};

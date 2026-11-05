import { User } from "../../model/users.model";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import validator from "validator";
import type { UserLoginObj } from "../../types/types";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password }: UserLoginObj = req.body;
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    return res.status(401).json({ error: "All fields are required!" });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).json({ error: "Invalid email address!" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(401).json({ error: "user not found" });
  }
  const matchingPswd = await bcrypt.compare(password, foundUser.password);

  if (matchingPswd) {
    const loggedInUser = await User.findByIdAndUpdate(
      foundUser._id,
      { active: true },
      { runValidators: true, new: true },
    )
      .select("-password")
      .exec();
    return res.status(200).json(loggedInUser);
  } else {
    return res.status(401).json({ error: "Wrong password!" });
  }
};

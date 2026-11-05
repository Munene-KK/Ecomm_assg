import { User } from "../../model/users.model";
import type { Request, Response } from "express";
import type { UserRegisterObj } from "../../types/types";
import { isEmail, isStrongPassword } from "validator";
import bcrypt from "bcrypt";
import { generateUserId } from "../../config/generateID.config";

export const registerUser = async (req: Request, res: Response) => {
  const { fullname, email, password }: UserRegisterObj = req.body;
  if (!fullname?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ error: "All fieds are required!" });
  }
  //validate email and password
  if (!isEmail(email)) {
    res.status(400).json({ error: "Invalid email!" });
  }
  if (!isStrongPassword(password)) {
    res.status(400).json({ error: "Weak password!" });
  }

  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }
  //create the new user
  try {
    //hash password
    const hashedPswd = await bcrypt.hash(password, 10);
    //create the new user
    //generate userID
    const userID: string = generateUserId(fullname);
    const newUser = { fullname, email, userID, password: hashedPswd };
    const user = await User.create(newUser);
    res.status(200).json(user);
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

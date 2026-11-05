import type { Request, Response } from "express";
import { Admin } from "../../model/admin.model";
import type { AdminsObJ } from "../../types/types";
import validator from "validator";
import bcrypt from "bcrypt";
export const getAdmins = async (req: Request, res: Response) => {
  const admins = await Admin.find({})
    .sort({ createdAt: -1 })
    .select("-password")
    .select("-__v");
  if (!admins.length || !admins) {
    return res.status(200).json({ success: "No admins added yet!" });
  }
  res.status(200).json(admins);
};
export const createAdmin = async (req: Request, res: Response) => {
  const { fullname, role, email, password }: AdminsObJ = req.body;
  if (
    !fullname?.trim() ||
    !role?.trim() ||
    !email?.trim() ||
    !password?.trim()
  ) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  //validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  //validate pswd strength
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Weak password" });
  }
  //duplicate email
  const duplicateEmail = await Admin.findOne({ email });
  if (duplicateEmail) {
    return res.status(409).json({ error: "Email already eists!" });
  }
  //create the admin
  try {
    //hashpasswrd
    const hashedPswd = await bcrypt.hash(password, 10);
    //create new admin
    await Admin.create({ fullname, role, email, password: hashedPswd });
    res.status(200).json({ success: "New admin has been created!" });
  } catch (error) {
    console.error(error instanceof Error ? error.stack : error);
    res.status(500).json({ error: "Internal Server error!" });
  }
};

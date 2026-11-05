import type { Request, Response } from "express";
import { User } from "../../model/users.model";
export const viewUsers = async (req: Request, res: Response) => {
  const users = await User.find({})
    .select("-password")
    .select("-email")
    .select("-fullname")
    .select("-phoneNumber")
    .select("-address")
    .select("-shoppingCart")
    .select("-__v")
    .select("-_id")
    .sort({ createdAt: -1 })
    .exec();
  if (!users || !users.length) {
    return res.status(200).json({ success: "No users yet" });
  }
  res.status(200).json(users);
};
//[
//   {
//     "_id": "6ad9ee8772f67cd0eab967a2",
//     "fullname": "Abigael Victoria",
//     "email": "abbyvicky254@gmail.com",
//     "userID": "Abigael6816",
//     "active": true,
//     "role": "user",
//     "phoneNumber": "+254 ",
//     "address": "0",
//     "shoppingCart": [],
//     "__v": 0
//   }
// ]

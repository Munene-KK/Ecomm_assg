import { Admin } from "../../model/admin.model";
import type { Request, Response } from "express";
import type { AdminsLoginObj } from "../../types/types";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../../middleware/jwt/createToken.jwt.middleware";
import { refreshToken } from "../../middleware/jwt/refreshToken.jwt.middleware";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password }: AdminsLoginObj = req.body;
  if (!email?.trim() || !password?.trim()) {
    return res.status(401).json({ error: "Email and password required!" });
  }
  if (!isEmail(email)) {
    return res.status(401).json({ error: "Invalid email address" });
  }
  //find the admin
  const foundAdmin = await Admin.findOne({ email });
  if (!foundAdmin) {
    return res.status(401).json({ error: "Admin not found!" });
  }
  const matchingPswd = await bcrypt.compare(password, foundAdmin.password);
  if (matchingPswd) {
    if (!foundAdmin.activate) {
      return res
        .status(401)
        .json({ error: "Unaotharized , you account is suspended!" });
    }
    const logedInAdmin = await Admin.findByIdAndUpdate(
      foundAdmin._id,
      {
        status: true,
      },
      { new: true, runValidators: true },
    )
      .select("-password")
      .exec();

    if (!logedInAdmin) {
      return res.status(404).json({ error: "Admin not found!" });
    }
    //jwt token
    const accessToken = createToken(logedInAdmin._id.toString());
    const refreshtoken = refreshToken(logedInAdmin._id.toString());
    //add refresh token to the database
    await Admin.findByIdAndUpdate(
      logedInAdmin._id,
      { refreshToken: refreshtoken },
      { new: true, runValidators: true },
    );
    //save to a cookie
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ admin: logedInAdmin, token: accessToken });
  } else {
    return res.status(401).json({ error: "Wrong password!" });
  }
};

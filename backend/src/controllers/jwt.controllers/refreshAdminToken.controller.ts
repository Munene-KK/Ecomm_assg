import jwt, { type JwtPayload, type VerifyErrors } from "jsonwebtoken";
import type { Request, Response } from "express";
import { Admin } from "../../model/admin.model";

interface RefreshTokenPayload extends JwtPayload {
  id: string;
}

export const refreshAdminToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.sendStatus(401);

  const secret = process.env.REFRESH_TOKEN;
  const accessSecret = process.env.ACCESS_TOKEN;
  if (!secret || !accessSecret) return res.sendStatus(500);

  try {
    const foundAdmin = await Admin.findOne({ refreshToken });
    if (!foundAdmin || !foundAdmin.activate) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      secret,
      (err: VerifyErrors | null, decoded: JwtPayload | undefined | string) => {
        if (err || !decoded || typeof decoded === "string") {
          return res.sendStatus(403);
        }
        const { id } = decoded as RefreshTokenPayload;
        if (foundAdmin._id.toString() !== id) return res.sendStatus(403);

        const accessToken = jwt.sign({ id }, accessSecret, {
          expiresIn: "15m",
        });
        return res.json({ accessToken });
      },
    );
  } catch {
    return res.sendStatus(500);
  }
};

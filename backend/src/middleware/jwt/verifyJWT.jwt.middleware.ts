import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
interface AcessTokenPayload extends JwtPayload {
  id: string;
}
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  // console.log(authHeader);
  const token = authHeader.split(" ")[1];
  const secret = process.env.ACCESS_TOKEN;
  if (!token || !secret) {
    throw new Error("Anauthorized");
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string")
      return res.sendStatus(403);
    req.adminId = (decoded as AcessTokenPayload).id;
    next();
  });
};

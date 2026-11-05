import jwt from "jsonwebtoken";
export const refreshToken = (id: string): string => {
  const secret = process.env.REFRESH_TOKEN;
  if (!secret) {
    throw new Error("Refresh token is undefined!");
  }
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};

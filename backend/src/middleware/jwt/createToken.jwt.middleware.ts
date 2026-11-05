import jwt from "jsonwebtoken";
export const createToken = (id: string): string => {
  const accessToken = process.env.ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Acess key is not found!");
  }
  return jwt.sign({ id }, accessToken, { expiresIn: "5m" });
};

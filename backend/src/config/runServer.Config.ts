import { connectDB } from "./connectDB.config";
const PORT = process.env.PORT ?? 3500;
import type { Express } from "express";
export const runServer = async (app: Express): Promise<void> => {
  await connectDB();
  app.listen(PORT, (): void =>
    console.log(`Server is running on port ${PORT}`),
  );
};

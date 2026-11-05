import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const connectionString = process.env.DATABASE_URL;

  //type guard
  if (!connectionString) {
    throw new Error(`Database connection string is undefined!`);
  }
  try {
    await mongoose.connect(connectionString, { family: 4 });
    console.log(`Connected to MongoDB`);
  } catch (err) {
    console.log(err);
  }
};

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  userID: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  location: {
    county: { type: String, default: "" },
    station: { type: String, default: "" },
  },
  shoppingCart: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, min: 1 },
    },
  ],
});

export const User = mongoose.model("User", userSchema);

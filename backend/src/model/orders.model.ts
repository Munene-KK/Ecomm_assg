import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    customerName: { type: String, required: true },
    shipping: {
      county: { type: String, default: "" },
      station: { type: String, default: "" },
      phone: { type: String, default: "" },
      notes: { type: String, default: "" },
    },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
    paymentMethod: { type: String, default: "Cash on delivery" },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);

import type { Request, Response } from "express";
import mongoose from "mongoose";
import { Admin } from "../../model/admin.model";
export const suspendAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "invalid Admin id!" });
  }
  const suspendedAdmin = await Admin.findByIdAndUpdate(
    id,
    { activate: false },
    { runValidators: true, new: true },
  );
  if (!suspendedAdmin) {
    return res.status(404).json({ error: "Admin not found!" });
  }
  return res.status(200).json({ sucess: "Admin has been suspended!" });
};

export const activateAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "invalid Admin id!" });
  }
  const activatedAdmin = await Admin.findByIdAndUpdate(
    id,
    { activate: true },
    { runValidators: true, new: true },
  );
  if (!activatedAdmin) {
    return res.status(404).json({ error: "Admin not found!" });
  }
  return res.status(200).json({ sucess: "Admin has been Activated!" });
};

export const deleteAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "invalid Admin id!" });
  }
  const deletedAdmin = await Admin.findByIdAndDelete(id)
    .select("-password")
    .select("-__v");
  if (!deletedAdmin) {
    return res.status(404).json({ error: "Admin not found!" });
  }
  return res.status(200).json(deletedAdmin);
};

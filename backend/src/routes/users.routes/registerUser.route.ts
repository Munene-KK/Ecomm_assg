import express from "express";
import { registerUser } from "../../controllers/users.controllers/registerUser.controller";
const router = express.Router();
router.post("/", registerUser);
export const registerUserRoute = router;

import express from "express";
import { loginUser } from "../../controllers/users.controllers/loginUser.controller";
const router = express.Router();
router.post("/", loginUser);
export const loginUserRoute = router;

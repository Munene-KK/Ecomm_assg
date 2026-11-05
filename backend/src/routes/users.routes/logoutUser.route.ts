import express from "express";
import { logoutUser } from "../../controllers/users.controllers/logoutUser.controller";
const router = express.Router();
router.patch("/:id", logoutUser);
export const logoutUserRoute = router;

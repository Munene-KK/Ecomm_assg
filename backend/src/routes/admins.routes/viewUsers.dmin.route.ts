import express from "express";
import { viewUsers } from "../../controllers/admin.controllers/viewUsers.controller";
const router = express.Router();
router.get("/", viewUsers);
export const viewUsersRoute = router;

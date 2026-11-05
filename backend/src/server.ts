import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import type { Request, Response } from "express";
import { runServer } from "./config/runServer.Config";
import { logMainEvents } from "./events/logger.events";
import { corsOptions } from "./middleware/corsOptions.middleware";
import { getProductsRoute } from "./routes/products.routes/getProducts.route";
import { createProductRoute } from "./routes/products.routes/createProduct.route";
import { deleteproductRoute } from "./routes/products.routes/deleteProduct.route";
import { updateproductRoute } from "./routes/products.routes/updateProduct.route";
import { loginAdminRoute } from "./routes/admins.routes/loginAdmin.route";
import { logoutAdminRoute } from "./routes/admins.routes/logoutAdmin.route";
import { monitorAdminRoute } from "./routes/admins.routes/monitorAdmin.route";
import { manageAdminRoute } from "./routes/admins.routes/manageAdmins.routes";
import { viewUsersRoute } from "./routes/admins.routes/viewUsers.dmin.route";
import { registerUserRoute } from "./routes/users.routes/registerUser.route";
import { logoutUserRoute } from "./routes/users.routes/logoutUser.route";
import { loginUserRoute } from "./routes/users.routes/loginUser.route";
import { verifyJWT } from "./middleware/jwt/verifyJWT.jwt.middleware";
import { refreshAdminTokenRoute } from "./routes/jwt.route/refreshAdminToken.jwt.route";
import { loginLimit, refreshLimit } from "./middleware/rateLimitor.middleware";
import { userCartRoute } from "./routes/users.routes/cart.routes";
import { userProfileRoute } from "./routes/users.routes/userProfile.route";
import { ordersRoute } from "./routes/orders.route";
import { adminOrdersRoute } from "./routes/admins.routes/adminOrders.route";

app.use(express.json());
app.use(cors(corsOptions));
app.use(logMainEvents);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello world from the backend!" });
});

//products endpoints
app.use("/api/products", getProductsRoute);
app.use("/api/products/create", createProductRoute);
app.use("/api/products/update", updateproductRoute);
app.use("/api/products/delete", deleteproductRoute);

//admin endpoints
app.use("/api/admins/login", loginLimit, loginAdminRoute);
app.use("/api/admins/logout", logoutAdminRoute);
app.use("/api/admins/monitor", monitorAdminRoute);
app.use("/api/admins/manange", manageAdminRoute);
app.use("/api/admins/users", viewUsersRoute);
app.use("/api/admins/orders", adminOrdersRoute);

//user endpoints ssss
app.use("/api/users/register", registerUserRoute);
app.use("/api/users/login", loginUserRoute);
app.use("/api/users/logout", logoutUserRoute);
app.use("/api/users", userProfileRoute);
app.use("/api/users/cart", userCartRoute);
app.use("/api/orders", ordersRoute);

//jwt endponts
app.use("/api/admin/refresh", refreshLimit, refreshAdminTokenRoute);
//run server
runServer(app);

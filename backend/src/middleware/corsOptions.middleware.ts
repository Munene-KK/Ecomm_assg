import { whiteList } from "../model/whiteList.model";
import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`NOT ALLOWED BY CORS`));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

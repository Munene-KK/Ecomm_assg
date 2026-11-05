import { whiteList } from "../model/whiteList.model";
import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowed =
      !origin ||
      whiteList.includes(origin) ||
      /^https:\/\/([a-z0-9]+--)?eccomassg\.netlify\.app$/.test(origin);

    if (allowed) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

import rateLimit from "express-rate-limit";
export const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 failed attempts per window
  skipSuccessfulRequests: true, // only count responses with status >= 400
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});
export const refreshLimit = rateLimit({
  windowMs: 15 * 50 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests " },
});

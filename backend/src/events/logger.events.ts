import type { Request, Response, NextFunction } from "express";
import { logEvents } from "./logEvents.events";

export const logMainEvents = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = `${req.url}\t${req.headers.origin}\t${req.method}`;
  logEvents(message, "mainEvents.log");
  next();
};

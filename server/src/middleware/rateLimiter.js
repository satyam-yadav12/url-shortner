import { rateLimit } from "express-rate-limit";

export const LimitActions = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "rate limit exceeded",
  statusCode: 429,
});

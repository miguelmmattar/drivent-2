import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPayments, postPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/payments", getPayments)
  .post("/payments/process", postPayment);

export { paymentsRouter };

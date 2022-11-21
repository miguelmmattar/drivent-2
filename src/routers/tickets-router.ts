import { Router } from "express";
import { getTicketsTypes, getTicket, postTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicket)
  .post("/", postTicket);

export { ticketsRouter };

import { Router } from "express";
import { getTicketsTypes, getTicket, postTicket } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/tickets/types", getTicketsTypes)
  .get("/tickets", getTicket)
  .post("/tickets", postTicket);

export { ticketsRouter };

import { Router } from "express";
import { getDefaultEvent,  getTicketsTypes, getTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";

const eventsRouter = Router();

eventsRouter
  .get("/", getDefaultEvent)
  .all("/*", authenticateToken)
  .get("/tickets/types", getTicketsTypes)
  .get("/tickets", getTicket);

export { eventsRouter };

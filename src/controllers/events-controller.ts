import { AuthenticatedRequest } from "@/middlewares";
import eventsService from "@/services/events-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getDefaultEvent(_req: Request, res: Response) {
  try {
    const event = await eventsService.getFirstEvent();
    return res.status(httpStatus.OK).send(event);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const ticketsTypes = await eventsService.getTicketsTypes();

    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const enrollment = await eventsService.getEnrollment(userId);
    const ticket = await eventsService.getTicket(enrollment.id);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

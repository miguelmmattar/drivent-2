import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import enrollmentService from "@/services/enrollments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: Request, res: Response) {
  try {
    const ticketsTypes = await ticketsService.getTicketsTypes();

    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const enrollment = await enrollmentService.getEnrollment(userId);
    
    const ticket = await ticketsService.getTicket(enrollment.id);

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketTypeId = req.body.ticketTypeId as number;
  
  try {
    const enrollment = await enrollmentService.getEnrollment(userId);
    const ticket = await ticketsService.postTicket(enrollment.id, ticketTypeId);

    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

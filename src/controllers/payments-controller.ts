import { AuthenticatedRequest } from "@/middlewares";
import enrollmentService from "@/services/enrollments-service";
import paymentService from "@/services/payments-services";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";
import { CardData } from "@/protocols";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId) as number;
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  const { userId } = req;
    
  try {
    const enrollment = await enrollmentService.getEnrollment(userId);
    const ticket = await ticketService.getTicketById(ticketId);
        
    const payment = await paymentService.getPayment(enrollment.id, ticket);
    
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error);
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
      
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = req.body.ticketId as number;
  const cardData = req.body.cardData as CardData;

  try {
    const enrollment = await enrollmentService.getEnrollment(userId);
    const ticket = await ticketService.getTicketById(ticketId);
    const payment = await paymentService.postPayment(enrollment.id, ticketId, cardData, ticket);
  
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.status(httpStatus.NOT_FOUND).send(error);
    if(error.name === "UnauthorizedError") return res.status(httpStatus.UNAUTHORIZED).send(error);
      
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

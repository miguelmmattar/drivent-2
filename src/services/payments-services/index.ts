import { notFoundError, invalidDataError, unauthorizedError } from "@/errors";
import { TicketType, Ticket, Payment } from "@prisma/client";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { CardData } from "@/protocols";

async function getPayment(enrollmentId: number, ticket: Ticket): Promise<Payment> {
  if(ticket.enrollmentId !== enrollmentId) throw  unauthorizedError();
    
  const payment = await paymentsRepository.findPaymentByTicketId(ticket.id);
  
  if(!payment) throw notFoundError();
  
  return payment;
}

async function postPayment(enrollmentId: number, ticketId: number, cardData: CardData, ticket: Ticket ): Promise<Payment> {
  if(!ticketId) throw invalidDataError(["No ticketId"]);
  if(!cardData) throw invalidDataError(["No cardData"]);
  if(ticket.enrollmentId !== enrollmentId) throw unauthorizedError();

  await ticketsRepository.upateTicket(ticketId);

  return await paymentsRepository.createPayment(ticket, cardData);
}

const paymentService = {
  getPayment,
  postPayment
};

export default paymentService;

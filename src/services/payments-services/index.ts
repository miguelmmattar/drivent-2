import { notFoundError, invalidDataError, unauthorizedError } from "@/errors";
import { Ticket, Payment } from "@prisma/client";
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
  if(!ticketId) throw invalidDataError;
  if(!cardData) throw invalidDataError;
  if(ticket.enrollmentId !== enrollmentId) throw unauthorizedError();

  await ticketsRepository.updateTicket(ticketId);

  return await paymentsRepository.createPayment(ticket, cardData);
}

const paymentService = {
  getPayment,
  postPayment
};

export default paymentService;

import { prisma } from "@/config";
import { CardData } from "@/protocols";
import {  Ticket } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function createPayment(ticket: Ticket, cardData: CardData) { 
  return prisma.payment.create({
    data: {
      ticketId: ticket.id,
      value: ticket.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toString().slice(-4),
      updatedAt: new Date()
    }
  });
}

const paymentsRepository = {
  findPaymentByTicketId,
  createPayment
};
  
export default paymentsRepository;

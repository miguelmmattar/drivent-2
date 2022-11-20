import { notFoundError, invalidDataError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType, Ticket, Enrollment } from "@prisma/client";

async function getTicketsTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findTicketsTypes();

  return types;
}

async function getTicket(enrollmentId: number): Promise<Ticket> {
  const ticket = await ticketsRepository.findTicket(enrollmentId);

  if(!ticket) throw notFoundError();

  return ticket;
}

async function postTicket(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  if(!ticketTypeId) throw invalidDataError(["No ticketTypeId"]);

  return await ticketsRepository.createTicket(ticketTypeId, enrollmentId);
}

const ticketsService = {
  getTicketsTypes,
  getTicket,
  postTicket
};

export default ticketsService;

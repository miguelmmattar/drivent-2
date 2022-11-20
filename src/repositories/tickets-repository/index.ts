import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    }
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: "RESERVED",
      ticketTypeId,
      enrollmentId,
      updatedAt: new Date()
    },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicket,
  createTicket
};

export default ticketsRepository;

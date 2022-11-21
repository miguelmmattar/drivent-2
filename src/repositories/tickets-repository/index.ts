import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id
    },
    include: {
      TicketType: true
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

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id
    },
    data: {
      status: "PAID",
      updatedAt: new Date()
    }
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketById,
  findTicket,
  createTicket,
  updateTicket
};

export default ticketsRepository;

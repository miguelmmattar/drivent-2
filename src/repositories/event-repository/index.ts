import { prisma } from "@/config";

async function findFirst() {
  return prisma.event.findFirst();
}

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findEnrollment(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId
    }
  });
}

async function findTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId
    }
  });
}

const eventRepository = {
  findFirst,
  findTicketsTypes,
  findTicket,
  findEnrollment
};

export default eventRepository;

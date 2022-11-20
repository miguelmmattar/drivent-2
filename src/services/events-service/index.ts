import { notFoundError } from "@/errors";
import eventRepository from "@/repositories/event-repository";
import { exclude } from "@/utils/prisma-utils";
import { Event, TicketType, Ticket, Enrollment  } from "@prisma/client";
import dayjs from "dayjs";

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  return exclude(event, "createdAt", "updatedAt");
}

export type GetFirstEventResult = Omit<Event, "createdAt" | "updatedAt">;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

async function getTicketsTypes(): Promise<TicketType[]> {
  const types = await eventRepository.findTicketsTypes();

  return types;
}

async function getEnrollment(userId: number): Promise<Enrollment> {
  const enrollment = await eventRepository.findEnrollment(userId);

  if(!enrollment) throw notFoundError();

  return enrollment;
}

async function getTicket(enrollmentId: number): Promise<Ticket> {
  const ticket = await eventRepository.findTicket(enrollmentId);

  if(!ticket) throw notFoundError();

  return ticket;
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
  getTicketsTypes,
  getEnrollment,
  getTicket
};

export default eventsService;

import { Publisher, Subjects, ticketUpdatedEvent } from "@eyaltickets/common";

export class TicketUpdatedPublisher extends Publisher<ticketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

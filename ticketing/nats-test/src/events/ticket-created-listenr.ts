import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreateListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = "payment-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log("Event data!", data);
    console.log("id data ==>", data.id);
    console.log("price data ==>", data.price);
    console.log("title data ==>", data.title);
    msg.ack();
  }
}

import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@eyaltickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";

export class OrderCreateListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find the tickets that the orders is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //if not tickets , throw error
    if (!ticket) {
      throw new Error("Tickets not found");
    }
    //mark the tickets as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    //save the ticket
    await ticket.save();
    // ack the message
    msg.ack();
  }
}

import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  //we use kubectl port-forward nats-depl-75b9dff744-m4kr8 4222:4222
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connect to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const option = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounting-server");
  const subscription = stan.subscribe(
    "ticket:created",
    "queue-group-name",
    option
  );

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => {
  stan.close();
});
process.on("SIGTERM", () => {
  // not working on windows
  stan.close();
});

//http://localhost:8222/streaming/channelsz?subs=1

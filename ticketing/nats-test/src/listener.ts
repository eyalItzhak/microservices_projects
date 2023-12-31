import nats from "node-nats-streaming";
console.clear();
const stan = nats.connect("ticketing", "123", {
  //we use kubectl port-forward nats-depl-75b9dff744-m4kr8 4222:4222
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connect to NATS");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg) => {
    console.log("Message received");
  });
});

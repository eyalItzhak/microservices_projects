import nats from "node-nats-streaming";
console.clear();
const stan = nats.connect("ticketing", "abc", {
  //we use kubectl port-forward nats-depl-75b9dff744-m4kr8 4222:4222
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connect to NATS");

  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:created", data, () => {
    console.log("event publish");
  });
});

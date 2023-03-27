
const amqp = require("amqplib");
let queue_name = "hello-queue";

(async () => {
    const rabbitSettings = {
        protocol: "amqp",
        hostname: "localhost",
        port: 5672,
        username: "guest",
        password: "guest",
        vhost: "/",
        authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"]
    }
    let connection = await amqp.connect(rabbitSettings)
    let channel = await connection.createChannel()

    await channel.assertQueue(queue_name, { durable: true })

    await channel.consume(queue_name, (msg) => {
        if (msg)
            console.log(msg.content.toString())
    })
})()
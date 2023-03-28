
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
    let channel = await connection.createConfirmChannel()

    await channel.assertQueue(queue_name, { durable: false, autoDelete: true })

    channel.sendToQueue(queue_name, Buffer.from("Hello"), {}, async function (err, ok) {
        await channel.close()
        await connection.close()

    })

})()
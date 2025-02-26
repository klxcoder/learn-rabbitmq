#!/usr/bin/env node

const amqp = require('amqplib');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: rpc_client.js num");
  process.exit(1);
}

async function main() {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();

    const correlationId = await generateUuid();
    const num = parseInt(args[0]);

    console.log(' [x] Requesting fib(%d)', num);

    const q = await channel.assertQueue('', {
      exclusive: true
    });

    channel.consume(q.queue, (msg) => {
      if (msg.properties.correlationId === correlationId) {
        console.log(' [.] Got %s', msg.content.toString());
        setTimeout(() => {
          connection.close();
          process.exit(0);
        }, 500);
      }
    }, {
      noAck: true
    });

    await channel.sendToQueue('rpc_queue',
      Buffer.from(num.toString()), {
      correlationId: correlationId,
      replyTo: q.queue
    });
  } catch (error) {
    console.error(error);
  }
}

async function generateUuid() {
  return Math.random().toString() +
    Math.random().toString() +
    Math.random().toString();
}

main();
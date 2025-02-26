#!/usr/bin/env node

const amqp = require('amqplib');

const args = process.argv.slice(2);
const key = (args.length > 0) ? args[0] : 'anonymous.info';
const msg = args.slice(1).join(' ') || 'Hello World!';

async function emitLogTopic() {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();

    const exchange = 'topic_logs';

    await channel.assertExchange(exchange, 'topic', {
      durable: false
    });

    await channel.publish(exchange, key, Buffer.from(msg));

    console.log(" [x] Sent %s: '%s'", key, msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

emitLogTopic();
#!/usr/bin/env node

const amqp = require('amqplib');

async function emitLogDirect() {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();

    const exchange = 'direct_logs';
    const args = process.argv.slice(2);
    const msg = args.slice(1).join(' ') || 'Hello World!';
    const severity = (args.length > 0) ? args[0] : 'info';

    await channel.assertExchange(exchange, 'direct', {
      durable: false
    });
    channel.publish(exchange, severity, Buffer.from(msg));
    console.log(` [x] Sent ${severity}: '${msg}'`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

emitLogDirect();
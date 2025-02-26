#!/usr/bin/env node

const amqp = require('amqplib');

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();

    const queue = 'hello';

    await channel.assertQueue(queue, {
      durable: false
    });

    const args = process.argv.slice(2);
    const msg = args[0] || 'Hello World!';

    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
};

sendMessage();
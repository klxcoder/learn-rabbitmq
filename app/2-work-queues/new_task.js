#!/usr/bin/env node

const amqp = require('amqplib');

const sendTask = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();
    const queue = 'task_queue';
    const msg = process.argv.slice(2).join(' ') || "Hello World!";

    await channel.assertQueue(queue, {
      durable: true
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true
    });
    console.log(" [x] Sent '%s'", msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

sendTask();

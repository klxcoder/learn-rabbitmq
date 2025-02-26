#!/usr/bin/env node

const amqp = require('amqplib');

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, {
      durable: true,
    });
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, async (msg) => {
      const secs = msg.content.toString().split('.').length - 1;

      console.log(" [x] Received %s", msg.content.toString());
      setTimeout(() => {
        console.log(` [x] Done ${msg.content.toString()}`);
        channel.ack(msg);
      }, secs * 1000);
    }, {
      noAck: false
    });
  } catch (error) {
    console.error(error);
  }
}

connect();
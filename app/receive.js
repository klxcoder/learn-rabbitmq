#!/usr/bin/env node

const amqp = require('amqplib');

const receiveMessages = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();

    const queue = 'hello';

    await channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, async (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
      // Example of an async operation
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(" [x] Done processing %s", msg.content.toString());
    }, {
      noAck: true
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

receiveMessages();
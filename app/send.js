#!/usr/bin/env node

const amqp = require('amqplib');

const sendMessage = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createConfirmChannel();

    const queue = 'hello';

    await channel.assertQueue(queue, {
      durable: false
    });

    const args = process.argv.slice(2);
    const msg = args[0] || 'Hello World!';

    // Send the message to the queue and wait for confirmation
    await new Promise((resolve, reject) => {
      channel.sendToQueue(queue, Buffer.from(msg), {}, (err, ok) => {
        if (err) {
          return reject(err);
        }
        resolve(ok);
      });
    });

    console.log(" [x] Sent %s", msg);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

sendMessage();
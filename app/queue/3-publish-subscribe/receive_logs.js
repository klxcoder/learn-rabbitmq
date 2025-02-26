#!/usr/bin/env node

const amqp = require('amqplib');

const receiveLogs = async () => {
  try {
    const connection = await amqp.connect('amqp://my-rabbit-server');
    const channel = await connection.createChannel();
    const exchange = 'logs';

    await channel.assertExchange(exchange, 'fanout', {
      durable: false
    });

    const q = await channel.assertQueue('', {
      exclusive: true
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    await channel.bindQueue(q.queue, exchange, '');

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(" [x] %s", msg.content.toString());
      }
    }, {
      noAck: true
    });
  } catch (error) {
    console.error(error);
  }
}

receiveLogs();
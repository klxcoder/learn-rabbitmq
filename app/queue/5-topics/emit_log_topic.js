#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);
const key = (args.length > 0) ? args[0] : 'anonymous.info';
const msg = args.slice(1).join(' ') || 'Hello World!';

amqp.connect('amqp://my-rabbit-server', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const exchange = 'topic_logs';

    channel.assertExchange(exchange, 'topic', {
      durable: false
    });
    channel.publish(exchange, key, Buffer.from(msg));
    console.log(" [x] Sent %s: '%s'", key, msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
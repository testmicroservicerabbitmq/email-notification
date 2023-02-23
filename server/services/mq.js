import amqp from 'amqplib';

import sendConfirmamtion from '../controller/email';
import loger from './loger';
import { EXCHANGE, QUEUE } from '../resources/constant';

const PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT) || 2;
const MQ_HOST = process.env.MQ_HOST || 'localhost';
const MQ_URL = `amqp://${MQ_HOST}:5672`;
let emailChannel = null;

const host = 'amqp://localhost';
const opt = {
  credentials: amqp.credentials.plain('rabbitmq', 'rabbitmq'),
};

const amqpConnectAndConsume = async () => {
  try {
    // create amqp connection
    const mqConnection = await amqp.connect(host, opt);
    loger.info('AMQP - connection established');

    emailChannel = await mqConnection.createChannel();

    await emailChannel.assertExchange(EXCHANGE, 'fanout', {
      durable: false,
    });

    // Ensure that the queue exists or create one if it doesn't

    await emailChannel.assertQueue(QUEUE);
    await emailChannel.bindQueue(QUEUE, EXCHANGE, '');

    // Only send <PREFETCH_COUNT> emails at a time
    emailChannel.prefetch(PREFETCH_COUNT);
    emailChannel.consume(QUEUE, (data) => {
      sendConfirmamtion(data, emailChannel);
    });
  } catch (err) {
    loger.error(`AMQP - ${err}`);
    process.exit();
  }
};

export default amqpConnectAndConsume;

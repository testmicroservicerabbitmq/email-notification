/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'dotenv';

import amqpConnectAndConsume from './services/mq';

const startServer = async () => {
  config();
  await amqpConnectAndConsume();
};

// Sleep till MongoDB and RabbitMQ services start.
startServer();

import winston from 'winston';

class Logger {
  constructor(options) {
    this.logger = winston.createLogger(options);
  }

  log(level, message) {
    this.logger.log(level, message);
  }

  error(message) {
    this.logger.error(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  info(message) {
    this.logger.info(message);
  }

  debug(message) {
    this.logger.debug(message);
  }
}

export default new Logger({
  level: 'info',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

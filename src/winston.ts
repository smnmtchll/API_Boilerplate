import winston, { loggers } from 'winston';

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {},
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: './logs/combined.log' }),
    ],
});

export default logger;

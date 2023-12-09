import dotenv from 'dotenv';
dotenv.config();
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: parseInt(process.env.PORT as string, 10) || 3000,
    databaseUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/events',
    collectionName: process.env.COLLECTION_NAME|| 'eventSets',
    jwtSecret: process.env.JWT_SECRET,
    eventSet: undefined,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    sheets: {
        key_url: process.env.SHEETS_KEY_URL,
        key_path: process.env.KEY_PATH,
    },
    aws: {
        from: process.env.FROM_EMAIL,
        reply: process.env.REPLY_EMAIL,
        region: process.env.AWS_REGION,
        email_domain: process.env.EMAIL_DOMAIN,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        
    },
}
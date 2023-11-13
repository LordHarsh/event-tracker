import dotenv from 'dotenv';
dotenv.config();
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: parseInt(process.env.PORT as string, 10) || 3000,
    databaseUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dbname',
    collectionName: process.env.DB_NAME|| 'registrations-test',

    jwtSecret: process.env.JWT_SECRET,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    sheets: {
        key_url: process.env.SHEETS_KEY_URL,
        key_path: process.env.KEY_PATH,
        id:  process.env.SHEETS_ID,
    }
}
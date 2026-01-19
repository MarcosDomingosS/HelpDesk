import 'dotenv/config';
import { Sequelize } from 'sequelize';

const dialect = process.env.DB_DIALECT;

if (!dialect) {
    throw new Error("DB_DIALECT não definido no .env");
}

const database = new Sequelize({
    database: process.env.DB_DATABASE!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT)!,
    dialect: dialect as any,
});

export default database;
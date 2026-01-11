import {Pool, PoolClient} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export let dbClient: PoolClient;

export const dbConnect = async () => {
    dbClient = await pool.connect();
}

export const query = (text: string, params?: any[]) => pool.query(text, params);

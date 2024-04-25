import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE
});

export const query = async (text: string, params: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error:any) {
    throw new Error(`Error executing query: ${error.message}`);
  }
};

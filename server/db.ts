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

module.exports = {
  query: (text: any, params: any) => pool.query(text, params)
};
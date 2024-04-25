import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const db = require('./db');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
 
  const result = await db.query('SELECT * FROM menu');
    res.json(result.rows);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
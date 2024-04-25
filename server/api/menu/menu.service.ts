import { Request, Response } from "express";
import { MenuSchema } from "./menu.schema";
import { query } from "../../db";

export async function getAllMenuItems(req: Request, res: Response) {
  try {
    const result = await query('SELECT * FROM menu', []);
    const items = result.rows;
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

export async function addMenuItem(req: Request, res: Response) {
  try {
    const newItem = MenuSchema.parse(req.body);
    const queryText = 'INSERT INTO menu_items (description, meal_type, item_name, price) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [newItem.description, newItem.mealType, newItem.itemName, newItem.price];
    const result = await query(queryText, values);
    const addedItem = result.rows[0];
    res.status(201).json(addedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Item Not added"});
  }
}

export async function updateMenuItem(req: Request, res: Response) {
  try {
    const itemId = req.params.id;
    const updatedItem = MenuSchema.parse(req.body);
    const queryText = 'UPDATE menu_items SET description = $1, meal_type = $2, item_name = $3, price = $4 WHERE id = $5 RETURNING *';
    const values = [updatedItem.description, updatedItem.mealType, updatedItem.itemName, updatedItem.price, itemId];
    const result = await query(queryText, values);
    if (result.rowCount === 0) {
      throw new Error("Item Not Found");
    }
    const updatedMenuItem = result.rows[0];
    res.json(updatedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Item Not Found" });
  }
}

export async function deleteMenuItem(req: Request, res: Response) {
  try {
    const itemId = req.params.id;
    const queryText = 'DELETE FROM menu_items WHERE id = $1';
    const values = [itemId];
    const result = await query(queryText, values);
    if (result.rowCount === 0) {
      throw new Error("Item Not Found");
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Item Not Found" });
  }
}

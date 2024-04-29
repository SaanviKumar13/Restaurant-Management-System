import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { z } from "zod";
import { query } from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

//MENU

const menuSchema = z.object({
  description: z.string(),
  meal_type: z.string(),
  item_name: z.string(),
  price: z.number(),
});

const validateMenuSchema = (req: Request, res: Response, next: () => void) => {
  try {
    menuSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid menu data" }); 
  }
};

app.get("/api/menu", async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM menu', []);
    res.status(200).json(rows);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/menu/add", async (req: Request, res: Response) => {
  const { description, meal_type, item_name, price } = req.body;
  try {
    await query('INSERT INTO menu (description, meal_type, item_name, price) VALUES ($1, $2, $3, $4)', [description, meal_type, item_name, price]);
    res.status(201).json({ message: 'Menu item added successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/menu/:id", validateMenuSchema, async (req: Request, res: Response) => {
  const id = req.params.id;
  const { description, meal_type, item_name, price } = req.body;
  try {
    await query('UPDATE menu SET description = $1, meal_type = $2, item_name = $3, price = $4 WHERE menu_id = $5', [description, meal_type, item_name, price, id]);
    res.status(200).json({ message: 'Menu item updated successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/menu/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await query('DELETE FROM menu WHERE menu_id = $1', [id]);
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// ORDERS

const orderSchema = z.object({
  customer_name: z.string(),
  items: z.array(z.object({
    item_name: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })),
  total_price: z.number().positive(),
  status: z.string(),
});

const validateOrderSchema = (req: Request, res: Response, next: () => void) => {
  try {
    orderSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid order data" });
  }
};

app.get("/api/orders", async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM orders', []);
    res.status(200).json(rows);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/orders/:id", async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const { rows } = await query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/orders/add", validateOrderSchema, async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    await query('INSERT INTO orders (customer_name, items, total_price, status) VALUES ($1, $2, $3, $4)',
      [orderData.customer_name, JSON.stringify(orderData.items), orderData.total_price, orderData.status]);
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message});
  }
});

app.put("/api/orders/update/:id", async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const { status } = req.body;
  try {
    await query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message});
  }
});

app.delete("/api/orders/delete/:id", async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    await query('DELETE FROM orders WHERE id = $1', [orderId]);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message});
  }
});

const validateSchema = (schema: z.ZodObject<any>, req: Request, res: Response, next: () => void) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: `Invalid ${schema} data` });
  }
};

// TABLES
const tableSchema = z.object({
  table_name: z.string(),
  capacity: z.number().int().positive(),
});

app.get("/api/tables", async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM tables', []);
    res.status(200).json(rows);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tables/add", validateSchema.bind(null, tableSchema), async (req: Request, res: Response) => {
  const { table_name, capacity } = req.body;
  try {
    await query('INSERT INTO tables ( table_name, capacity) VALUES ($1, $2)', [table_name, capacity]);
    res.status(201).json({ message: 'Table added successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/tables/update/:id", validateSchema.bind(null, tableSchema), async (req: Request, res: Response) => {
  const id = req.params.id;
  const { table_name, capacity } = req.body;
  try {
    await query('UPDATE tables SET table_name = $1, capacity = $2 WHERE table_id = $3', [table_name, capacity, id]);
    res.status(200).json({ message: 'Table details updated successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/tables/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await query('DELETE FROM tables WHERE table_id = $1', [id]);
    res.status(200).json({ message: 'Table deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});


// RESERVATIONS
const reservationSchema = z.object({
  customer_name: z.string(),
  reservation_date: z.string(), 
  reservation_time: z.string(), 
  table_id: z.number().int().positive(),
});

app.get("/api/reservations", async (req: Request, res: Response) => {
  try {
    const { rows } = await query('SELECT * FROM reservations', []);
    res.status(200).json(rows);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/reservations/add", validateSchema.bind(null, reservationSchema), async (req: Request, res: Response) => {
  const { customer_name, reservation_date, reservation_time, table_id } = req.body;
  try {
    await query('INSERT INTO reservations (customer_name, reservation_date, reservation_time, table_id) VALUES ($1, $2, $3, $4)', [customer_name, reservation_date, reservation_time, table_id]);
    res.status(201).json({ message: 'Reservation added successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/reservations/update/:id", validateSchema.bind(null, reservationSchema), async (req: Request, res: Response) => {
  const id = req.params.id;
  const { customer_name, reservation_date, reservation_time, table_id } = req.body;
  try {
    await query('UPDATE reservations SET customer_name = $1, reservation_date = $2, reservation_time = $3, table_id = $4 WHERE reservation_id = $5', [customer_name, reservation_date, reservation_time, table_id, id]);
    res.status(200).json({ message: 'Reservation updated successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/reservations/delete/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await query('DELETE FROM reservations WHERE reservation_id = $1', [id]);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});


const employeeSchema = z.object({
  employee_name: z.string(),
  employee_role: z.string(),
  address: z.string(),
  gender: z.enum(["male", "female", "other"]),
  phone_number: z.string().regex(/^\d{10}$/),
  dob: z.string(),
  salary: z.number().positive(),
});

// Get all employees
app.get("/employees", async (req: Request, res: Response) => {
  try {
    const { rows } = await query("SELECT * FROM employees", []);
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new employee
app.post("/employees/add", validateSchema.bind(null, employeeSchema), async (req: Request, res: Response) => {
  const { employee_name, employee_role, address, gender, phone_number, dob, salary } = req.body;
  try {
    await query(
      "INSERT INTO employees (employee_name, employee_role, address, gender, phone_number, dob, salary) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [employee_name, employee_role, address, gender, phone_number, dob, salary]
    );
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee by ID
app.put("/employees/update/:id", validateSchema.bind(null, employeeSchema), async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  const { employee_name, employee_role, address, gender, phone_number, dob, salary } = req.body;
  try {
    await query(
      "UPDATE employees SET employee_name = $1, employee_role = $2, address = $3, gender = $4, phone_number = $5, dob = $6, salary = $7 WHERE employee_id = $8",
      [employee_name, employee_role, address, gender, phone_number, dob, salary, employeeId]
    );
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an employee by ID
app.delete("/employees/delete/:id", async (req: Request, res: Response) => {
  const employeeId = req.params.id;
  try {
    await query("DELETE FROM employees WHERE employee_id = $1", [employeeId]);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Schema for the inventory item
const inventorySchema = z.object({
  name: z.string(),
  unit_price: z.number().positive(),
  category: z.string(),
  supplier_id: z.number().int().positive(),
  expiry_date: z.string().nullable(),
  purchase_date: z.string().nullable(),
  last_updated: z.string(),
  min_stock_level: z.number().int().positive(),
  max_stock_level: z.number().int().positive(),
  payment_id: z.number().int().positive(),
  delivery_time: z.string(),
});

// Get all inventory items
app.get("/inventory", async (req: Request, res: Response) => {
  try {
    const { rows } = await query("SELECT * FROM inventory", []);
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific inventory item by its ID
app.get("/inventory/:id", async (req: Request, res: Response) => {
  const inventoryId = req.params.id;
  try {
    const { rows } = await query("SELECT * FROM inventory WHERE inventory_id = $1", [inventoryId]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Inventory item not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new inventory item
app.post("/inventory/add", validateSchema.bind(null, inventorySchema), async (req: Request, res: Response) => {
  const { name, unit_price, category, supplier_id, expiry_date, purchase_date, last_updated, min_stock_level, max_stock_level, payment_id, delivery_time } = req.body;
  try {
    const { rows } = await query(
      "INSERT INTO inventory (name, unit_price, category, supplier_id, expiry_date, purchase_date, last_updated, min_stock_level, max_stock_level, payment_id, delivery_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [name, unit_price, category, supplier_id, expiry_date, purchase_date, last_updated, min_stock_level, max_stock_level, payment_id, delivery_time]
    );
    res.status(201).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update an inventory item by its ID
app.put("/inventory/update/:id", validateSchema.bind(null, inventorySchema), async (req: Request, res: Response) => {
  const inventoryId = req.params.id;
  const { name, unit_price, category, supplier_id, expiry_date, purchase_date, last_updated, min_stock_level, max_stock_level, payment_id, delivery_time } = req.body;
  try {
    const { rows } = await query(
      "UPDATE inventory SET name = $1, unit_price = $2, category = $3, supplier_id = $4, expiry_date = $5, purchase_date = $6, last_updated = $7, min_stock_level = $8, max_stock_level = $9, payment_id = $10, delivery_time = $11 WHERE inventory_id = $12 RETURNING *",
      [name, unit_price, category, supplier_id, expiry_date, purchase_date, last_updated, min_stock_level, max_stock_level, payment_id, delivery_time, inventoryId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Inventory item not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an inventory item by its ID
app.delete("/inventory/delete/:id", async (req: Request, res: Response) => {
  const inventoryId = req.params.id;
  try {
    const { rowCount } = await query("DELETE FROM inventory WHERE inventory_id = $1", [inventoryId]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Inventory item not found" });
    } else {
      res.status(200).json({ message: "Inventory item deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


const paymentSchema = z.object({
  amount: z.number().positive(),
  table_id: z.number().int().positive(),
  payment_method: z.string(),
  payment_status: z.enum(["Pending", "Paid"]),
});

// Get all payments
app.get("/payments", async (req: Request, res: Response) => {
  try {
    const { rows } = await query("SELECT * FROM payments", []);
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific payment by its ID
app.get("/payments/:id", async (req: Request, res: Response) => {
  const paymentId = req.params.id;
  try {
    const { rows } = await query("SELECT * FROM payments WHERE payment_id = $1", [paymentId]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Payment not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new payment for a table
app.post("/payments/add", validateSchema.bind(null, paymentSchema), async (req: Request, res: Response) => {
  const { amount, table_id, payment_method, payment_status } = req.body;
  try {
    const { rows } = await query(
      "INSERT INTO payments (amount, table_id, payment_method, payment_status) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, table_id, payment_method, payment_status]
    );
    res.status(201).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a payment by its ID
app.put("/payments/update/:id", validateSchema.bind(null, paymentSchema), async (req: Request, res: Response) => {
  const paymentId = req.params.id;
  const { amount, table_id, payment_method, payment_status } = req.body;
  try {
    const { rows } = await query(
      "UPDATE payments SET amount = $1, table_id = $2, payment_method = $3, payment_status = $4 WHERE payment_id = $5 RETURNING *",
      [amount, table_id, payment_method, payment_status, paymentId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Payment not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a payment by its ID
app.delete("/payments/delete/:id", async (req: Request, res: Response) => {
  const paymentId = req.params.id;
  try {
    const { rowCount } = await query("DELETE FROM payments WHERE payment_id = $1", [paymentId]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Payment not found" });
    } else {
      res.status(200).json({ message: "Payment deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const customerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

// Get all customers
app.get("/customers", async (req: Request, res: Response) => {
  try {
    const { rows } = await query("SELECT * FROM customers", []);
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific customer by its ID
app.get("/customers/:id", async (req: Request, res: Response) => {
  const customerId = req.params.id;
  try {
    const { rows } = await query("SELECT * FROM customers WHERE customer_id = $1", [customerId]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new customer
app.post("/customers/add", validateSchema.bind(null, customerSchema), async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  try {
    const { rows } = await query(
      "INSERT INTO customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );
    res.status(201).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a customer by its ID
app.put("/customers/update/:id", validateSchema.bind(null, customerSchema), async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const { name, email, phone, address } = req.body;
  try {
    const { rows } = await query(
      "UPDATE customers SET name = $1, email = $2, phone = $3, address = $4 WHERE customer_id = $5 RETURNING *",
      [name, email, phone, address, customerId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer by its ID
app.delete("/customers/delete/:id", async (req: Request, res: Response) => {
  const customerId = req.params.id;
  try {
    const { rowCount } = await query("DELETE FROM customers WHERE customer_id = $1", [customerId]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Customer not found" });
    } else {
      res.status(200).json({ message: "Customer deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


const supplierSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
});

// Get all suppliers
app.get("/suppliers", async (req: Request, res: Response) => {
  try {
    const { rows } = await query("SELECT * FROM suppliers", []);
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific supplier by its ID
app.get("/suppliers/:id", async (req: Request, res: Response) => {
  const supplierId = req.params.id;
  try {
    const { rows } = await query("SELECT * FROM suppliers WHERE supplier_id = $1", [supplierId]);
    if (rows.length === 0) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new supplier
app.post("/suppliers/add", validateSchema.bind(null, supplierSchema), async (req: Request, res: Response) => {
  const { name, email, phone, address } = req.body;
  try {
    const { rows } = await query(
      "INSERT INTO suppliers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, phone, address]
    );
    res.status(201).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update a supplier by its ID
app.put("/suppliers/update/:id", validateSchema.bind(null, supplierSchema), async (req: Request, res: Response) => {
  const supplierId = req.params.id;
  const { name, email, phone, address } = req.body;
  try {
    const { rows } = await query(
      "UPDATE suppliers SET name = $1, email = $2, phone = $3, address = $4 WHERE supplier_id = $5 RETURNING *",
      [name, email, phone, address, supplierId]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a supplier by its ID
app.delete("/suppliers/delete/:id", async (req: Request, res: Response) => {
  const supplierId = req.params.id;
  try {
    const { rowCount } = await query("DELETE FROM suppliers WHERE supplier_id = $1", [supplierId]);
    if (rowCount === 0) {
      res.status(404).json({ error: "Supplier not found" });
    } else {
      res.status(200).json({ message: "Supplier deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

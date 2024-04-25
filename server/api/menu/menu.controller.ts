import { Router} from "express";
import { getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from "./menu.service";


export default (): Router => {
  const app = Router();

  // Route to get all menu items
  app.get('/', getAllMenuItems);

  // Route to add a new menu item
  app.post('/add', addMenuItem);

  // Route to update an existing menu item
  app.put('/update/:id', updateMenuItem);

  // Route to delete an existing menu item
  app.delete('/delete/:id', deleteMenuItem);

  return app;
};

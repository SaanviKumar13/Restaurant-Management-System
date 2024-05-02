import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

interface MenuItem {
  menu_id: number;
  description: string;
  meal_type: string;
  item_name: string;
  price: number;
}

const MenuForm = () => {
  return (
    <div className="w-[20vw] mt-10 h-fit py-4 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl">Add New Item</h1>
        <div>
          <form
            action={"/menu"}
            method="post"
            className="flex flex-col items-center gap-5"
          >
            <Input
              type="text"
              placeholder="Description"
              name="description"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Meal Type"
              name="meal_type"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Item Name"
              name="item_name"
              className="m-2 w-48"
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              className="m-2 w-48"
            />
            <Button
              name="_action"
              type="submit"
              value="additem"
              className="bg-purple-100 ml-2"
            >
              Add Item
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;

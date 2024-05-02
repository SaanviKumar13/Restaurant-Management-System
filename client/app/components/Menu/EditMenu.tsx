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
        <h1 className="text-xl lg:text-2xl font-heading font-semibold">
          Add New Item
        </h1>
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
            <button
              name="_action"
              type="submit"
              value="additem"
              className="px-4 z-30 py-2 bg-purple-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-purple-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700  "
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;

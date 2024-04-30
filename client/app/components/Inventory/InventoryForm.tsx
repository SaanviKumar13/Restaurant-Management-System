import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

const InventoryForm = () => {
  // Function to format current date as YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-[30vw] mt-10 h-fit py-4 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl">Add New Item</h1>
        <div>
          <form
            action={"/inventory"}
            method="post"
            className="flex flex-col items-center gap-5"
          >
            <Input
              type="text"
              placeholder="Name"
              name="name"
              className="m-2 w-48"
            />
            <Input
              type="number"
              placeholder="Unit Price"
              name="unit_price"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Category"
              name="category"
              className="m-2 w-48"
            />
            <Input
              type="string"
              placeholder="Unit"
              name="unit"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Delivery Time"
              name="delivery_time"
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

export default InventoryForm;

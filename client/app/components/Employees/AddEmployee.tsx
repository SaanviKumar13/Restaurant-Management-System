import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EmployeeForm = () => {
  return (
    <div className="w-[30vw] mt-10 h-fit py-4 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl">Add Employee</h1>
        <div>
          <form
            action={"/employees"}
            method="post"
            className="flex flex-col items-center gap-5"
          >
            <Input
              type="text"
              placeholder="Name"
              name="employee_name"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Role"
              name="employee_role"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Address"
              name="address"
              className="m-2 w-48"
            />
            <Input
              type="text"
              placeholder="Gender"
              name="gender"
              className="m-2 w-48"
            />
            <Input
              type="date"
              placeholder="Date of Birth"
              name="dob"
              className="m-2 w-48"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phone_number"
              className="m-2 w-48"
            />
            <Input
              type="number"
              placeholder="Salary"
              name="salary"
              className="m-2 w-48"
            />
            <Button
              name="_action"
              type="submit"
              value="additem"
              className="bg-purple-100 ml-2"
            >
              Add Employee
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;

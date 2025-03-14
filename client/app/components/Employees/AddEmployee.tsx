import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EmployeeForm = () => {
  return (
    <div className="w-[20vw] px-0 mt-10 h-fit py-6 bg-[#141720] rounded-md text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-heading font-semibold">
          Add Employee
        </h1>
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
              className="m-0 w-48"
            />
            <Input
              type="text"
              placeholder="Role"
              name="employee_role"
              className="m-0 w-48"
            />
            <Input
              type="text"
              placeholder="Address"
              name="address"
              className="m-0 w-48"
            />
            <Input
              type="text"
              placeholder="Gender"
              name="gender"
              className="m-0 w-48"
            />
            <Input
              type="date"
              placeholder="Date of Birth"
              name="dob"
              className="m-0 w-48"
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              name="phone_number"
              className="m-0 w-48"
            />
            <Input
              type="number"
              placeholder="Salary"
              name="salary"
              className="m-0 w-48"
            />
            <button
              name="_action"
              type="submit"
              value="additem"
              className="px-4 z-30 py-2 bg-purple-400 rounded-md text-white relative font-semibold font-sans after:-z-20 after:absolute after:h-1 after:w-1 after:bg-purple-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;

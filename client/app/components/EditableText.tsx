import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  initialText: string | number;
  action: string;
  name: string;
  _id: number;
}

const EditableText = ({ initialText, action, name, _id }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      <form action={action} method="post" className={isEditing ? "" : "hidden"}>
        <Input
          type="text"
          name={name}
          className="m-2 w-32"
          onBlur={handleBlur}
        />
        <Button
          name="_action"
          type="submit"
          value="updateitem"
          className="hidden"
        >
          Update
          <Input
            type="_id"
            name="_id"
            value={_id}
            className="m-2 w-48 hidden"
            readOnly
          />
        </Button>
      </form>

      <span className={isEditing ? "hidden" : ""}>{initialText}</span>
    </div>
  );
};

export default EditableText;

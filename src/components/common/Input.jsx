import { userFormControls } from "../../utils/FormConstants";

export default function Input({ currentItem, value, onChange }) {
  let content = null;
  switch (currentItem.componentType) {
    case "input":
      content = (
        <input
          type={currentItem.type}
          name={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          className="border p-2 rounded"
        />
      );
      break;
    default:
      content = (
        <input
          type={currentItem.type}
          name={currentItem.name}
          placeholder={currentItem.placeholder}
          value={value}
          onChange={onChange}
          className="border p-2 rounded"
        />
      );
      break;
  }
  return content;
}

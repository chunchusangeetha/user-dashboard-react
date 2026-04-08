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
          className="w-full border border-gray-300 px-3 py-2 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
          transition"
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
          className="w-full border border-gray-300 px-3 py-2 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
          transition"
        />
      );
      break;
  }

  return content;
}
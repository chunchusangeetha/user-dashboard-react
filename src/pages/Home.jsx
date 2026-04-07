import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to User Dashboard Application
      </h1>

      <p className="mb-4 max-w-md">
        Here you can manage users: view list, check details, add, edit and
        delete users.
      </p>

      <button
        onClick={() => navigate("/DashBoard")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
      >
        Go to Users List
      </button>
    </div>
  );
}



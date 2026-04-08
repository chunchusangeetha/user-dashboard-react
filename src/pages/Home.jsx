import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-300 px-6">
      <div className="text-center text-white max-w-2xl">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          User Dashboard Application
        </h1>

        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Manage users efficiently in one place. View user details,
          search and filter users, add new users, and update existing
          user information with a clean and simple dashboard.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <span className="bg-white/20 px-4 py-2 rounded-lg">View Users</span>
          <span className="bg-white/20 px-4 py-2 rounded-lg">Search</span>
          <span className="bg-white/20 px-4 py-2 rounded-lg">Filter</span>
          <span className="bg-white/20 px-4 py-2 rounded-lg">Add User</span>
          <span className="bg-white/20 px-4 py-2 rounded-lg">Edit User</span>
          <span className="bg-white/20 px-4 py-2 rounded-lg">Delete User</span>
        </div>

        <button
          onClick={() => navigate("/users")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Go to Users List
        </button>

      </div>
    </div>
  );
}
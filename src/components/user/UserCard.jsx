import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col items-center text-center">

      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg mb-3">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <h3 className="font-semibold text-gray-800">{user.name}</h3>

      <p className="text-gray-500 text-sm mb-3">{user.email}</p>

      <button
        onClick={() => navigate(`/users/${user.id}`)}
        className="text-blue-600 font-medium hover:underline"
      >
        View Details
      </button>
    </div>
  );
}


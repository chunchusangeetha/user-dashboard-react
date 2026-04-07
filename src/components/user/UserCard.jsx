import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold">{user.name}</h3>
      <p>{user.email}</p>

      <button
        onClick={() => navigate(`/user/${user.id}`)}
        className="mt-2 text-blue-500"
      >
        View Details
      </button>
    </div>
  );
}


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../services/api";
import Loader from "../components/common/Loader";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser(id)
      .then((data) => setUser(data))
      .catch(() => setError("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [id]);

  // Delete handler
  const handleDelete = async () => {
    try {
      await deleteUser(id);
      navigate("/users");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center text-center ">
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <div className="border p-4 rounded shadow">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Company:</strong> {user.company}
        </p>
        <p>
          <strong>City:</strong> {user.city}
        </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

        <button
          onClick={() => navigate("/users")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
      </div>

    </div>
  );
}

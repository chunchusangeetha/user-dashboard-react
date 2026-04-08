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
      navigate("/users", { state: { refresh: true } });
    } catch (err) {
      throw err;
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-300 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800">User Details</h2>

        <p className="font-bold text-lg mt-2 mb-5 text-gray-700">
          Hey, Hi {user.name}
        </p>

        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-3 text-gray-700 mx-auto w-fit">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            { label: "Company", value: user.company },
            { label: "City", value: user.city },
          ].map((item) => (
            <div key={item.label} className="flex items-start">
              <span className="w-24 font-semibold text-gray-600 text-left">
                {item.label}
              </span>

              <span className="mx-2 text-gray-400">:</span>

              <span className="break-words text-gray-800 font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3 sm:gap-5">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Delete
          </button>

          <button
            onClick={() => navigate("/users")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

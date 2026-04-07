import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import UserList from "../components/user/UserList";
import { useUsers } from "../hooks/useUser";

export default function DashBoard() {
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Users List</h2>
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add User
          </button>
        </div>

        <UserList users={users} />
      </div>
    </>
  );
}

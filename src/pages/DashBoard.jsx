import Loader from "../components/common/Loader";
import UserList from "../components/user/UserList";
import { useUsers } from "../hooks/useUser";

export default function DashBoard() {
   const { users, loading, error } = useUsers();

   if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
     <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <UserList users={users} />
    </div>
    </>
  );
}

import UserCard from "./UserCard";

export default function UserList({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users && users.length > 0 ? users.map((user) => (
        <UserCard key={user.id} user={user} />
      )):<p className="text-center mt-4">No users found</p>}
    </div>
  );
}
import UserCard from "./UserCard";

export default function UserList({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {users && users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
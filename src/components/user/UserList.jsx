import UserCard from "./UserCard";

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return (
      <p className="text-center text-xl text-white mt-10">
        No users found
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user}  />
      ))}
    </div>
  );
}
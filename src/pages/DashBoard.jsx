import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import UserList from "../components/user/UserList";
import { useUsers } from "../hooks/useUser";
import SearchBar from "../components/common/SearchBar";
import { useState, useMemo, useEffect } from "react";

export default function DashBoard() {
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const filteredUsers = useMemo(() => {
  let result = [...users];

  // Search
  result = result.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  if (sortOrder === "asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  }

  return result;
}, [users, search, sortOrder]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
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

      <SearchBar search={search} setSearch={setSearch} />

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      <UserList users={filteredUsers} />
    </div>
  );
}

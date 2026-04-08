import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import UserList from "../components/user/UserList";
import { useUsers } from "../hooks/useUser";
import SearchBar from "../components/common/SearchBar";
import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function DashBoard() {
  const { users, loading, error } = useUsers();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const debouncedSearch = useDebounce(search, 500);
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Search
    result = result.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    // Sort
    if (sortOrder === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [users, debouncedSearch, sortOrder]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-pink-300 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Users Dashboard</h1>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <SearchBar search={search} setSearch={setSearch} />

          <div className="flex items-center gap-3">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg bg-white"
            >
              <option value="">Sort</option>
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>

            <button
              onClick={() => navigate("/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              + Add User
            </button>
          </div>
        </div>

        <UserList users={filteredUsers} />
      </div>
    </div>
  );
}

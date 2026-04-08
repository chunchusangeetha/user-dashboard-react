export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 p-2 rounded-lg w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

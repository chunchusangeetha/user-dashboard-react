export default function Loader() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">

      <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="text-gray-600 text-sm font-medium">
        Loading users...
      </p>

    </div>
  );
}
import { useEffect, useState } from "react";
import {getUsers} from "../services/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to fetch users"))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};
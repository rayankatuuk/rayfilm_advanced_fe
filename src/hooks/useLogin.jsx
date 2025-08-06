import { useEffect, useState } from "react";
import { getUsername } from "../services/auth.service";

export const useLogin = (token) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
      setLoading(false);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return { username, loading };
};

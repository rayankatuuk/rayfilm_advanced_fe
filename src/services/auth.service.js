import axios from "axios";

export const login = (data, callback) => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  axios
    .get(API_URL)
    .then((res) => {
      const user = res.data.find(
        (u) => u.username === data.username && u.password === data.password
      );
      if (user) {
        // Generate token mockapi
        const token = btoa(JSON.stringify({ user: user.username }));
        callback(true, token);
      } else {
        callback(false, { response: { data: "Username atau password salah" } });
      }
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getUsername = (token) => {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded.user;
  } catch {
    return null;
  }
};

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MovieContext = createContext();
const MOVIE_API_URL = import.meta.env.VITE_REACT_APP_MOVIE_API_URL;

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  // State film
  const [movies, setMovies] = useState([]);
  const [userData, setUserData] = useState({
    watchlist: [],
    ratings: {},
    favorites: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Ambil data film dari API saat mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(MOVIE_API_URL);
      setMovies(res.data);
    } catch (err) {
      console.error("Gagal fetch movies:", err);
    }
  };

  // CREATE: Tambah film baru ke API dengan pengecekan id dan title
  const addMovieWithIdCheck = async (newMovie) => {
    // Cek apakah id sudah ada di movies
    if (newMovie.id) {
      const isExist = movies.some((movie) => movie.id === newMovie.id);
      if (isExist) {
        alert("ID film sudah ada!");
        return null;
      }
    }
    // Cek apakah title sudah ada di movies (case-insensitive)
    const isTitleExist = movies.some(
      (movie) =>
        movie.title.trim().toLowerCase() === newMovie.title.trim().toLowerCase()
    );
    if (isTitleExist) {
      alert("Judul film sudah ada! Silakan masukkan judul lain.");
      return null;
    }
    // Lanjutkan create jika id dan title belum ada atau tidak dikirim
    try {
      const { id, ...movieData } = newMovie;
      const res = await axios.post(MOVIE_API_URL, {
        ...movieData,
        isInWatchlist: false,
        userRating: null,
        rating: movieData.rating || 4.0,
      });
      setMovies((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Gagal tambah movie:", err);
      return null;
    }
  };

  // UPDATE: Perbarui film di API dengan pengecekan judul duplikat
  const updateMovie = async (movieId, updates) => {
    // Cek apakah title baru sudah ada di movies (case-insensitive), kecuali pada movie yang sedang diupdate
    if (updates.title) {
      const isTitleExist = movies.some(
        (movie) =>
          movie.id !== movieId &&
          movie.title.trim().toLowerCase() ===
            updates.title.trim().toLowerCase()
      );
      if (isTitleExist) {
        alert("Judul film sudah ada! Silakan masukkan judul lain.");
        return null;
      }
    }
    try {
      const res = await axios.put(`${MOVIE_API_URL}/${movieId}`, updates);
      setMovies((prev) =>
        prev.map((movie) => (movie.id === movieId ? res.data : movie))
      );
      return res.data;
    } catch (err) {
      console.error("Gagal update movie:", err);
      return null;
    }
  };

  // DELETE: Hapus film dari API
  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(`${MOVIE_API_URL}/${movieId}`);
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (err) {
      console.error("Gagal delete movie:", err);
    }
  };

  // Operasi Watchlist
  const toggleWatchlist = async (movieId) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      await updateMovie(movieId, { isInWatchlist: !movie.isInWatchlist });
    }
  };

  // Operasi Rating
  const rateMovie = async (movieId, rating) => {
    await updateMovie(movieId, { userRating: rating });
    setUserData((prevData) => ({
      ...prevData,
      ratings: {
        ...prevData.ratings,
        [movieId]: rating,
      },
    }));
  };

  // Fungsi pencarian
  const getMoviesByCategory = (category) => {
    switch (category) {
      case "trending":
        return movies.filter(
          (movie) => movie.genre === "Animation" || movie.genre === "Action"
        );
      case "topRated":
        return movies.filter((movie) => movie.rating >= 4.5);
      case "continueWatching":
        return movies.filter((movie) => movie.progress && movie.progress > 0);
      case "watchlist":
        return movies.filter((movie) => movie.isInWatchlist);
      default:
        return movies;
    }
  };

  const getFilteredMovies = () => {
    let filteredMovies = getMoviesByCategory(selectedCategory);
    if (searchQuery) {
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filteredMovies;
  };

  const getMovieById = (movieId) => {
    return movies.find((movie) => movie.id === movieId);
  };

  const getStats = () => {
    return {
      totalMovies: movies.length,
      watchlistCount: movies.filter((m) => m.isInWatchlist).length,
      ratedMoviesCount: movies.filter((m) => m.userRating !== null).length,
      averageRating:
        movies.reduce((sum, movie) => {
          return sum + (movie.userRating || 0);
        }, 0) / movies.filter((m) => m.userRating).length || 0,
    };
  };

  const value = {
    movies,
    userData,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    addMovieWithIdCheck,
    getMoviesByCategory,
    updateMovie,
    deleteMovie,
    getFilteredMovies,
    getMovieById,
    toggleWatchlist,
    rateMovie,
    getStats,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

import { create } from "zustand";
import axios from "axios";

const MOVIE_API_URL = import.meta.env.VITE_REACT_APP_MOVIE_API_URL;

export const useMovieStore = create((set, get) => ({
  movies: [],
  isLoading: false,
  error: null,
  userData: {
    watchlist: [],
    ratings: {},
    favorites: [],
  },
  searchQuery: "",
  selectedCategory: "all",

  fetchMovies: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(MOVIE_API_URL);
      set({ movies: res.data, isLoading: false });
    } catch (err) {
      set({
        error: "Gagal mengambil data film. Silakan coba lagi.",
        isLoading: false,
      });
      console.error("Gagal fetch movies:", err);
    }
  },

  addMovieWithIdCheck: async (newMovie) => {
    const { movies } = get();
    if (newMovie.id && movies.some((m) => m.id === newMovie.id)) {
      alert("ID film sudah ada!");
      return null;
    }
    if (
      movies.some(
        (m) =>
          m.title.trim().toLowerCase() === newMovie.title.trim().toLowerCase()
      )
    ) {
      alert("Judul film sudah ada! Silakan masukkan judul lain.");
      return null;
    }
    try {
      const { id, ...movieData } = newMovie;
      const res = await axios.post(MOVIE_API_URL, {
        ...movieData,
        isInWatchlist: false,
        userRating: null,
        rating: movieData.rating || 4.0,
        isInitial: false, // Data baru selalu bukan data awal
      });
      set((state) => ({ movies: [...state.movies, res.data] }));
      return res.data;
    } catch (err) {
      console.error("Gagal tambah movie:", err);
      return null;
    }
  },

  updateMovie: async (movieId, updates) => {
    const { movies } = get();
    const movie = movies.find((m) => m.id === movieId);
    if (movie?.isInitial) {
      alert("Data awal tidak bisa diubah!");
      return null;
    }
    if (
      updates.title &&
      movies.some(
        (m) =>
          m.id !== movieId &&
          m.title.trim().toLowerCase() === updates.title.trim().toLowerCase()
      )
    ) {
      alert("Judul film sudah ada! Silakan masukkan judul lain.");
      return null;
    }
    try {
      const res = await axios.put(`${MOVIE_API_URL}/${movieId}`, updates);
      set((state) => ({
        movies: state.movies.map((m) => (m.id === movieId ? res.data : m)),
      }));
      return res.data;
    } catch (err) {
      console.error("Gagal update movie:", err);
      return null;
    }
  },

  deleteMovie: async (movieId) => {
    const movie = get().movies.find((m) => m.id === movieId);
    if (movie?.isInitial) {
      alert("Data awal tidak bisa dihapus!");
      return;
    }
    try {
      await axios.delete(`${MOVIE_API_URL}/${movieId}`);
      set((state) => ({
        movies: state.movies.filter((m) => m.id !== movieId),
      }));
    } catch (err) {
      console.error("Gagal delete movie:", err);
    }
  },

  toggleWatchlist: async (movieId) => {
    const movie = get().movies.find((m) => m.id === movieId);
    if (movie?.isInitial) {
      alert("Data awal tidak bisa diubah!");
      return;
    }
    if (movie) {
      await get().updateMovie(movieId, { isInWatchlist: !movie.isInWatchlist });
    }
  },

  rateMovie: async (movieId, rating) => {
    const movie = get().movies.find((m) => m.id === movieId);
    if (movie?.isInitial) {
      alert("Data awal tidak bisa diubah!");
      return;
    }
    await get().updateMovie(movieId, { userRating: rating });
    set((state) => ({
      userData: {
        ...state.userData,
        ratings: { ...state.userData.ratings, [movieId]: rating },
      },
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  getMoviesByCategory: (category) => {
    const { movies } = get();
    switch (category) {
      case "trending":
        return movies.filter(
          (m) => m.genre === "Animation" || m.genre === "Action"
        );
      case "topRated":
        return movies.filter((m) => m.rating >= 4.5);
      case "continueWatching":
        return movies.filter((m) => m.progress && m.progress > 0);
      case "watchlist":
        return movies.filter((m) => m.isInWatchlist);
      default:
        return movies;
    }
  },

  getFilteredMovies: () => {
    const { searchQuery, selectedCategory } = get();
    let filtered = get().getMoviesByCategory(selectedCategory);
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  },

  getMovieById: (id) => get().movies.find((m) => m.id === id),

  getStats: () => {
    const { movies } = get();
    return {
      totalMovies: movies.length,
      watchlistCount: movies.filter((m) => m.isInWatchlist).length,
      ratedMoviesCount: movies.filter((m) => m.userRating !== null).length,
      averageRating:
        movies.reduce((sum, m) => sum + (m.userRating || 0), 0) /
          movies.filter((m) => m.userRating).length || 0,
    };
  },
}));

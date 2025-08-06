import { useEffect } from "react";
import {
  Navbar,
  Hero,
  TrendingMovies,
  TopRating,
  NewReleases,
  ContinueWatching,
  WatchlistSection,
  MovieManager,
  Footer,
} from "../components";
import { useLogin } from "../hooks/useLogin";
import { useMovieStore } from "../store/zustand/movieStore";

const Home = () => {
  const { username, loading } = useLogin();
  const fetchMovies = useMovieStore((state) => state.fetchMovies);
  const isLoadingMovies = useMovieStore((state) => state.isLoading);
  const errorMovies = useMovieStore((state) => state.error);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary text-white">
        Loading...
      </div>
    );
  }

  if (!username) {
    return null;
  }

  if (isLoadingMovies) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary text-white">
        Memuat data film...
      </div>
    );
  }

  if (errorMovies) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary text-white">
        <div className="text-2xl mb-4">⚠️</div>
        <div className="text-lg font-bold mb-2">{errorMovies}</div>
        <button
          onClick={fetchMovies}
          className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen text-white">
      <Navbar />
      <Hero />
      <ContinueWatching />
      <TrendingMovies />
      <TopRating />
      <NewReleases />
      <WatchlistSection />
      <MovieManager />
      <Footer />
    </div>
  );
};

export default Home;

import { useMovies } from "../context/MovieContext";
import MovieCard from "./MovieCard";

const WatchlistSection = () => {
  const { getMoviesByCategory, selectedCategory, searchQuery } = useMovies();

  // Only show watchlist section when specifically selected
  if (selectedCategory !== "watchlist") {
    return null;
  }

  const watchlistMovies = getMoviesByCategory("watchlist");

  // Filter by search query if present
  const filteredMovies = searchQuery
    ? watchlistMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : watchlistMovies;

  if (filteredMovies.length === 0) {
    return (
      <section className="px-4 py-6 sm:px-10 sm:py-10 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold mb-2">
            {searchQuery ? "Tidak Ada Hasil" : "Daftar Saya Kosong"}
          </h2>
          <p className="text-gray-400">
            {searchQuery
              ? "Tidak ada film yang cocok dengan pencarian Anda"
              : "Tambahkan film ke daftar saya untuk menonton nanti"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-6 sm:px-10 sm:py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Daftar Saya
          <span className="text-sm text-gray-400 ml-2">
            ({filteredMovies.length} film)
          </span>
        </h2>
      </div>

      {/* Grid film */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showControls={true} />
        ))}
      </div>
    </section>
  );
};

export default WatchlistSection;

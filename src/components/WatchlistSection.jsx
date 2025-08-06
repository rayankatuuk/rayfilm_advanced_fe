import { useState, useEffect } from "react";
import { useMovieStore } from "../store/zustand/movieStore";
import MovieCard from "./MovieCard";

const WatchlistSection = () => {
  const { getMoviesByCategory, selectedCategory, searchQuery } =
    useMovieStore();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (selectedCategory !== "watchlist") {
    return null;
  }

  const watchlistMovies = getMoviesByCategory("watchlist");

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

  const maxVisible = isMobile ? 2 : 4;
  const totalSlides = Math.ceil(filteredMovies.length / maxVisible);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const visibleMovies = filteredMovies.slice(
    slideIndex * maxVisible,
    slideIndex * maxVisible + maxVisible
  );

  return (
    <section className="px-4 py-6 sm:px-10 sm:py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">
          Daftar Saya
          <span className="text-sm text-gray-400 ml-2">
            ({filteredMovies.length} film)
          </span>
        </h2>
      </div>
      <div className="relative">
        {filteredMovies.length > maxVisible && (
          <button
            onClick={handlePrev}
            disabled={slideIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 transition ${
              slideIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &lt;
          </button>
        )}
        <div
          className={`grid grid-cols-2 ${
            !isMobile ? "sm:grid-cols-2 md:grid-cols-4" : ""
          } gap-4`}
        >
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showControls={true} />
          ))}
        </div>
        {filteredMovies.length > maxVisible && (
          <button
            onClick={handleNext}
            disabled={slideIndex === totalSlides - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 transition ${
              slideIndex === totalSlides - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  );
};

export default WatchlistSection;

import { useState, useEffect } from "react";
import { useMovies } from "../context/MovieContext";
import MovieCard from "./MovieCard";

const ContinueWatching = () => {
  const { getMoviesByCategory, selectedCategory, searchQuery } = useMovies();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Only show continue watching section if we're viewing all categories or continue watching specifically
  if (selectedCategory !== "all" && selectedCategory !== "continueWatching") {
    return null;
  }

  const movies = getMoviesByCategory("continueWatching");

  // Filter by search query if present
  const filteredMovies = searchQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : movies;

  if (filteredMovies.length === 0) {
    return null;
  }

  // Slider logic
  const maxVisible = isMobile ? 1 : 4;
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
    <section className="px-4 py-6 sm:px-10 sm:py-10">
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Melanjutkan Tonton Film
          {searchQuery && (
            <span className="text-sm text-gray-400 ml-2">
              ({filteredMovies.length} hasil)
            </span>
          )}
        </h2>
      </div>
      <div className="relative">
        {/* Tombol slider kiri */}
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
        {/* Card Movie */}
        <div
          className={`grid grid-cols-1 ${
            !isMobile ? "sm:grid-cols-2 md:grid-cols-4" : ""
          } gap-4`}
        >
          {visibleMovies.map((movie, index) => (
            <div key={movie.id || index} className="relative">
              <MovieCard
                movie={movie}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md h-48 object-cover w-full"
                imgClassName="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Tombol slider kanan */}
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

export default ContinueWatching;

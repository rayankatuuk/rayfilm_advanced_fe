import { useMovieStore } from "../store/zustand/movieStore";
import MovieCard from "./MovieCard";

const NewReleases = () => {
  const { movies, selectedCategory, searchQuery } = useMovieStore();

  if (selectedCategory !== "all") {
    return null;
  }

  const newReleases = movies
    .filter((movie) => movie.year >= 2023)
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);

  const filteredMovies = searchQuery
    ? newReleases.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newReleases;

  if (filteredMovies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-6 sm:px-10 sm:py-10 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Rilis Baru
          {searchQuery && (
            <span className="text-sm text-gray-400 ml-2">
              ({filteredMovies.length} hasil)
            </span>
          )}
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden">
        {filteredMovies.map((movie, index) => (
          <MovieCard
            key={movie.id || index}
            movie={movie}
            className={`${index >= 2 ? "hidden sm:block" : ""}`}
          />
        ))}
      </div>
    </section>
  );
};

export default NewReleases;

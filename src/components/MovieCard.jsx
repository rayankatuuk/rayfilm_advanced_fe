import { useState } from "react";
import { useMovieStore } from "../store/zustand/movieStore";

const MovieCard = ({
  movie,
  showControls = true,
  className = "",
  imgClassName,
  hideProgressBar,
}) => {
  const { toggleWatchlist, rateMovie } = useMovieStore();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
  };
  const handleRating = (rating) => {
    rateMovie(movie.id, rating);
    setShowRatingModal(false);
  };

  return (
    <>
      <div
        className={`relative rounded-md overflow-hidden shadow-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}
        onClick={() => setShowDetails(true)}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className={imgClassName || "w-full h-full object-cover"}
        />
        {/* Badge film */}
        {movie.hasNewEpisode && (
          <div className="absolute top-2 left-2 bg-blue-600 text-[12px] px-2 py-1 rounded text-white font-medium">
            Episode Baru
          </div>
        )}
        {movie.isTop10 && (
          <div className="absolute top-0 right-2 bg-red-600 text-[12px] px-2 py-1 rounded-b-md text-white font-bold">
            Top 10
          </div>
        )}
        {/* Progress bar untuk lanjut menonton */}
        {movie.progress && !hideProgressBar && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="h-1 bg-gray-600">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${movie.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        {/* Kontrol interaktif */}
        {showControls && (
          <div className="absolute inset-0 bg-black/80 bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            {" "}
            <div className="flex gap-2">
              {/* Tombol watchlist */}
              <button
                onClick={handleWatchlistToggle}
                className={`p-2 rounded-full transition-all duration-200 ${
                  movie.isInWatchlist
                    ? "bg-red-600 text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
                title={
                  movie.isInWatchlist
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"
                }
              >
                {movie.isInWatchlist ? "❤️" : "🤍"}{" "}
              </button>

              {/* Tombol rating */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRatingModal(true);
                }}
                className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-200 "
                title="Rate Movie"
              >
                ⭐
              </button>
            </div>
          </div>
        )}
        {/* Tampilan rating */}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-white text-xs">
          ⭐ {movie.userRating || movie.rating}
        </div>{" "}
      </div>

      {/* Modal Rating */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4 text-black">
              Rate "{movie.title}"
            </h3>
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRating(rating)}
                  className="text-3xl hover:scale-110 transition-transform text-yellow-600"
                >
                  {rating <= (movie.userRating || 0) ? "⭐" : "☆"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              {movie.userRating && (
                <button
                  onClick={() => handleRating(null)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove Rating
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Film */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={movie.image}
                className="w-full h-auto rounded-lg"
                alt={movie.title}
              />

              <div>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">Year:</span> {movie.year}
                  </p>
                  <p>
                    <span className="font-semibold">Genre:</span> {movie.genre}
                  </p>
                  <p>
                    <span className="font-semibold">Rating:</span> ⭐{" "}
                    {movie.rating}/5
                  </p>
                  {movie.userRating && (
                    <p>
                      <span className="font-semibold">Your Rating:</span> ⭐{" "}
                      {movie.userRating}/5
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Description:</span>
                  </p>
                  <p className="text-gray-300">{movie.description}</p>
                </div>

                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleWatchlistToggle}
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      movie.isInWatchlist
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {movie.isInWatchlist
                      ? "Remove from Watchlist"
                      : "Add to Watchlist"}
                  </button>

                  <button
                    onClick={() => setShowRatingModal(true)}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded transition-all duration-200"
                  >
                    Rate Movie
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;

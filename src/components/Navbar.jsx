import { useState } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getStats,
  } = useMovies();

  const stats = getStats();

  const categories = [
    { value: "all", label: "Semua" },
    { value: "trending", label: "Trending" },
    { value: "topRated", label: "Top Rating" },
    { value: "continueWatching", label: "Lanjut Tonton" },
    { value: "watchlist", label: "Daftar Saya" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="flex items-center justify-between px-2 py-4 bg-primary mx-auto max-w-screen-3xl">
        <div className="flex items-center gap-4 sm:gap-16 mx-4 sm:mx-10">
          {" "}
          <Link to="/" onClick={() => window.location.reload()}>
            <img
              src="/assets/icon/Logo.svg"
              alt="logo"
              className="w-14 h-14 sm:w-auto sm:h-auto"
            />
          </Link>
          {/* Filter kategori */}
          <div className="hidden lg:flex gap-4">
            {categories
              .filter((category) => category.value !== "all")
              .map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`text-xs sm:text-xl transition-colors duration-200 ${
                    selectedCategory === category.value
                      ? "text-red-500 font-semibold"
                      : "text-white hover:text-red-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}{" "}
          </div>
          {/* Pilihan kategori mobile */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mx-4 sm:mx-14 gap-4">
          {/* Fungsi pencarian */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari film"
              className="bg-gray-800 text-white px-3 py-2 rounded text-sm w-20 h-8 sm:w-60 border border-gray-600 focus:border-white focus:outline-none"
            />
          </div>
          {/* Tampilan statistik */}
          <div className="hidden sm:block text-xs text-gray-300">
            Watchlist: {stats.watchlistCount}
          </div>
          {/* Profil dan dropdown */}
          <div className="flex flex-shrink-0 ml-3">
            <img
              src="/assets/icon/profile.svg"
              alt=""
              className="w-6 h-6 sm:w-10 sm:h-10"
            />
          </div>
          <button
            className="flex sm:hidden"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
            >
              <path
                d="M1.645 0.0214844L7 5.36482L12.355 0.0214844L14 1.66648L7 8.66648L0 1.66648L1.645 0.0214844Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            className="hidden sm:flex relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.645 0.0214844L7 5.36482L12.355 0.0214844L14 1.66648L7 8.66648L0 1.66648L1.645 0.0214844Z"
                fill="white"
              />
            </svg>{" "}
          </button>
          {/* Menu dropdown desktop */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-16 bg-gray-900 rounded shadow-lg py-2 px-4 z-50 min-w-[200px] flex flex-col gap-2">
              <Link
                to="/profile"
                className="text-sm text-white py-2 text-left hover:underline"
              >
                Profile Saya
              </Link>{" "}
              <button
                className="text-sm text-white py-2 text-left hover:underline"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          )}{" "}
        </div>

        {/* Menu mobile */}
        <div
          className={`sm:hidden flex-col absolute top-16 left-0 w-full bg-gray-900 p-4 z-50 ${
            isDropdownOpen ? "flex" : "hidden"
          }`}
        >
          <button className="text-sm text-white py-2 text-left">
            Profile Saya
          </button>
          <button
            className="text-sm text-white py-2 text-left"
            onClick={handleLogout}
          >
            Keluar
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

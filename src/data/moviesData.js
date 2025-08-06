// Data film awal untuk aplikasi
export const initialMoviesData = {
  continueWatching: [
    {
      id: 11,
      title: "Don't Look Up",
      image: "/assets/image/dont look up.png",
      rating: 4.1,
      year: 2021,
      genre: "Comedy",
      description:
        "Dua astronom mencoba memperingatkan umat manusia tentang komet yang mendekat.",
      progress: 75,
      isInWatchlist: true,
      userRating: 4,
    },
    {
      id: 12,
      title: "The Batman",
      image: "/assets/image/carusel 2.png",
      rating: 4.2,
      year: 2022,
      genre: "Action",
      description:
        "Batman menyusup ke dunia bawah Gotham City ketika seorang pembunuh sadis meninggalkan jejak petunjuk kriptik.",
      progress: 45,
      isInWatchlist: true,
      userRating: null,
    },
    {
      id: 13,
      title: "Blue Lock",
      image: "/assets/image/carusel 3.png",
      rating: 4.6,
      year: 2022,
      genre: "Anime",
      description:
        "Sebuah fasilitas pelatihan sepak bola untuk menciptakan striker terhebat di dunia.",
      progress: 30,
      isInWatchlist: true,
      userRating: 5,
    },
    {
      id: 14,
      title: "A Man Called Otto",
      image: "/assets/image/carusel 4.png",
      rating: 4.4,
      year: 2022,
      genre: "Drama",
      description:
        "Satu-satunya kebahagiaan seorang duda yang pemarah berasal dari mengkritik dan menghakimi tetangga-tetangganya yang membuatnya kesal.",
      progress: 60,
      isInWatchlist: true,
      userRating: null,
    },
  ],
};

// Data pengguna
export const initialUserData = {
  watchlist: [],
  ratings: {},
  favorites: [],
};

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

const Home = () => {
  const { username, loading } = useLogin();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary text-white">
        Loading...
      </div>
    );
  }

  if (!username) {
    // Redirect handled by useLogin, but you can add fallback here if needed
    return null;
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

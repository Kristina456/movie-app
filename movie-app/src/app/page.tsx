import { HomePage } from "@/features/HomePage/HomePage.component";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from "@/lib/apiService";

export default async function getHomePage() {
  const newestMovies = await getNowPlayingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <HomePage
      newestMovies={newestMovies}
      topRatedMovies={topRatedMovies}
      popularMovies={popularMovies}
    />
  );
}

import { HomePage } from "@/features/HomePage/HomePage.component";
import { getNewestMovies, getTopRatedMovies } from "@/lib/apiService";

export default async function getHomePage() {
  const newestMovies = await getNewestMovies();
  const topRatedMovies = await getTopRatedMovies();

  return (
    <HomePage newestMovies={newestMovies} topRatedMovies={topRatedMovies} />
  );
}

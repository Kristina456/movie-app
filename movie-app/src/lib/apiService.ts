import { MovieItem, MoviesData } from "@/dtos/MoviesData.dto";
import { fetchFromApi } from "./fetchFromApi";

export async function getMovieDetails(id: string): Promise<MovieItem | null> {
  try {
    return await fetchFromApi(id);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("now_playing");
}

export async function getTopRatedMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("top_rated");
}

export async function getPopularMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("popular");
}

async function getMovieApiWithPath(path: string): Promise<MoviesData> {
  try {
    return await fetchFromApi(path);
  } catch (error) {
    console.error(`Error fetching /3/movies/${path}`, error);
    return { results: [] };
  }
}

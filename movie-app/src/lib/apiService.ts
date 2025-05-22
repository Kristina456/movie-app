import { MovieItem, MoviesData } from "@/types/MoviesData.dto";
import { fetchFromApi } from "./fetchFromApi";

export async function getMovieDetails(id: string): Promise<MovieItem | null> {
  try {
    return await fetchFromApi(`/movie/${id}`);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function getNowPlayingMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("movie/now_playing");
}

export async function getTopRatedMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("movie/top_rated");
}

export async function getPopularMovies(query?: string): Promise<MoviesData> {
  return await getMovieApiWithPath(`movie/popular${query || ""}`);
}

export async function getSearchedMovies(query: string): Promise<MoviesData> {
  return await getMovieApiWithPath(`search/movie?query=${query}`);
}

async function getMovieApiWithPath(path: string): Promise<MoviesData> {
  try {
    return await fetchFromApi(path);
  } catch (error) {
    console.error(`Error fetching /3/movies/${path}`, error);
    return { results: [] };
  }
}

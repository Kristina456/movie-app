import { MovieItem, MoviesData } from "@/types/MoviesData.dto";
import { fetchFromApi } from "./fetchFromApi";
import { MoviesGenres } from "@/types/MoviesGenres.dto";
import { MovieCasts } from "@/types/CastsData.dto";

export async function getMovieDetails(id: string): Promise<MovieItem | null> {
  try {
    return await fetchFromApi(`/movie/${id}`);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return null;
  }
}

export async function getMovieCasts(id: string): Promise<MovieCasts | null> {
  try {
    return await fetchFromApi(`/movie/${id}/casts`);
  } catch (error) {
    console.error("Error fetching movie casts:", error);
    return null;
  }
}

export async function getNewestMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("movie/upcoming");
}

export async function getTopRatedMovies(): Promise<MoviesData> {
  return await getMovieApiWithPath("movie/top_rated");
}

export async function getSearchedMovies(query: string): Promise<MoviesData> {
  return await getMovieApiWithPath(`search/movie?query=${query}`);
}

export async function getMoviesGenres(): Promise<MoviesGenres> {
  return await getMovieApiWithPath("genre/movie/list");
}

export async function getPopularMoviesWithPage(
  page: string,
  genre?: string,
  year?: string,
  voteAverage?: string
): Promise<MoviesData> {
  let url = `discover/movie?page=${page}&sort_by=popularity.desc`;

  if (genre && genre !== "") {
    url += `&with_genres=${genre}`;
  }

  if (year && year !== "") {
    url += `&primary_release_year=${year}`;
  }
  if (voteAverage && voteAverage !== "") {
    url += `&vote_average.gte=${voteAverage}&vote_average.lte=${voteAverage}`;
  }
  return await getMovieApiWithPath(url);
}

async function getMovieApiWithPath<T>(path: string): Promise<T> {
  try {
    return await fetchFromApi(path);
  } catch (error) {
    console.error(`Error fetching /3/${path}`, error);

    if (path.startsWith("genre")) {
      return { genres: [] } as T;
    }

    return { results: [] } as T;
  }
}

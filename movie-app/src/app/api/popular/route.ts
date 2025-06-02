import { getMoviesGenres, getPopularMoviesWithPage } from "@/lib/apiService";
import { MovieItem } from "@/types/MoviesData.dto";
import { Genre } from "@/types/MoviesGenres.dto";

type MoviesByGenres = {
  genre: Genre;
  movies: MovieItem[];
};

const fetchMoviesByGenre = async (genre: Genre) => {
  return await getPopularMoviesWithPage("1", `${genre.id}`);
};

export async function GET() {
  try {
    const moviesGenres = await getMoviesGenres();
    const moviesByGenre: MoviesByGenres[] = [];
    const promises = moviesGenres.genres.map(async (genre) => {
      const result = await fetchMoviesByGenre(genre);
      moviesByGenre.push({
        genre,
        movies: result.results.slice(0, 10),
      });
    });

    await Promise.all(promises);
    return Response.json(moviesByGenre);
  } catch (error) {
    console.error("Error in /api/movies-by-genre:", error);
    return new Response("Failed to fetch movies", { status: 500 });
  }
}

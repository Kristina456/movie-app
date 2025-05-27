import { Genre } from "@/types/MoviesGenres.dto";
import styles from "./MovieFilters.module.scss";

interface Props {
  genres: Genre[];
  setGenre: (genreId: number | null) => void;
  movieYear: number | null;
  setMovieYear: (year: number | null) => void;
  voteAverage?: number | null;
  setVoteAverage: (vote: number | null) => void;
  handleResetFilters?: () => void;
}

export function MovieFilters({
  genres,
  setGenre,
  movieYear,
  setMovieYear,
  voteAverage,
  setVoteAverage,
  handleResetFilters,
}: Props) {
  return (
    <div className={styles["movie-filters__filters"]}>
      {genres.map((genre) => (
        <button
          onClick={() => setGenre(genre.id)}
          className={styles["movie-filters__genre"]}
          key={genre.id}
        >
          {genre.name}
        </button>
      ))}

      <select
        value={movieYear ?? ""}
        onChange={(e) => setMovieYear(parseInt(e.target.value))}
      >
        <option value="" disabled>
          Year
        </option>
        {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => 2025 - i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      <select
        value={voteAverage ?? ""}
        onChange={(e) => setVoteAverage(parseFloat(e.target.value))}
      >
        <option value="" disabled>
          Rating
        </option>
        {Array.from({ length: 10 }, (_, i) => i + 1)
          .reverse()
          .map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </select>
      <button onClick={handleResetFilters}>Reset filters</button>
    </div>
  );
}

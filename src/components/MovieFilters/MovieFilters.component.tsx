import { Genre } from "@/types/MoviesGenres.dto";
import styles from "./MovieFilters.module.scss";
import Image from "next/image";

interface Props {
  genres: Genre[];
  setSelectedGenre: (genreIds: number[]) => void;
  selectedGenre: number[];
  movieYear: number | null;
  setMovieYear: (year: number | null) => void;
  voteAverage?: number | null;
  setVoteAverage: (vote: number | null) => void;
  handleResetFilters?: () => void;
  handleSearch: () => void;
  showFilter: boolean;
  setShowFilter: (val: boolean) => void;
}

export function MovieFilters({
  genres,
  setSelectedGenre,
  selectedGenre,
  movieYear,
  setMovieYear,
  voteAverage,
  setVoteAverage,
  handleResetFilters,
  handleSearch,
  showFilter,
  setShowFilter,
}: Props) {
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleSelectGenre = (genreItem: Genre) => {
    if (selectedGenre.includes(genreItem.id)) {
      const index = selectedGenre.indexOf(genreItem.id);
      if (index !== -1) {
        selectedGenre.splice(index, 1);
        setSelectedGenre([...selectedGenre]);
      }
    } else {
      setSelectedGenre([...selectedGenre, genreItem.id]);
    }
  };

  return (
    <div className={styles["movie-filters__filters"]}>
      <button
        className={styles["movie-filters__filter-button"]}
        onClick={handleShowFilter}
      >
        <Image src="/images/filter.svg" alt="filter" width={30} height={30} />
      </button>
      {showFilter && (
        <div className={styles["movie-filters__filters-wrapper"]}>
          <div className={styles["movie-filters__filter"]}>
            <div className={styles["movie-filters__title"]}>Genre: </div>
            {genres.map((genreItem) => (
              <button
                onClick={() => {
                  handleSelectGenre(genreItem);
                }}
                className={`${styles["movie-filters__genre"]} ${selectedGenre.includes(genreItem.id) ? styles["movie-filters__genre--selected"] : ""}`}
                key={genreItem.id}
              >
                {genreItem.name}
              </button>
            ))}
            <div className={styles["movie-filters__select"]}>
              <div>
                <select
                  value={movieYear ?? ""}
                  onChange={(e) => setMovieYear(parseInt(e.target.value))}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from(
                    { length: 2025 - 1980 + 1 },
                    (_, i) => 2025 - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
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
              </div>
            </div>
            <div className={styles["movie-filters__search-button"]}>
              <button onClick={handleSearch}>Search</button>
            </div>
            <div className={styles["movie-filters__reset-button"]}>
              <button onClick={handleResetFilters}>Reset filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import styles from "./MostWatchedPage.module.scss";
import { useEffect, useState } from "react";
import { MoviesData, MovieItem } from "@/types/MoviesData.dto";
import { Genre, MoviesGenres } from "@/types/MoviesGenres.dto";
import { MostWatchedList } from "@/components/MostWatchedList/MostWatchedList.component";
import { MovieFilters } from "@/components/MovieFilters/MovieFilters.component";
import { Loading } from "@/components/Loading/Loading.component";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function MostWatchedPage() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [movieYear, setMovieYear] = useState<number | null>(null);
  const [voteAverage, setVoteAverage] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  const fetchMovies = async (
    page: number,
    year?: number,
    genre?: string,
    voteAverage?: number
  ) => {
    const genreQuery = genre ? `&with_genres=${genre}` : "";
    const yearQuery = year ? `&primary_release_year=${year}` : "";
    const voteAverageQuery = voteAverage
      ? `&vote_average.gte=${voteAverage}&vote_average.lte=${voteAverage}`
      : "";

    try {
      const response = await fetch(
        `/api/most-watched?page=${page}${yearQuery}${genreQuery}${voteAverageQuery}`
      );
      const data: MoviesData = await response.json();
      if (data.results.length === 0) {
        setHasMore(false);
      }
      setMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results]
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/genre`);
      const data: MoviesGenres = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies(
      page,
      movieYear !== null ? movieYear : undefined,
      selectedGenre.join(","),
      voteAverage !== null ? voteAverage : undefined
    );
  }, [page]);

  const handleSearch = async () => {
    setIsLoading(true);
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setShowFilter(false);
    await fetchMovies(
      1,
      movieYear !== null ? movieYear : undefined,
      selectedGenre.join(","),
      voteAverage !== null ? voteAverage : undefined
    );
    setIsLoading(false);
  };

  const observerRef = useInfiniteScroll(
    () => setPage((prev) => prev + 1),
    hasMore,
    isLoading
  );

  const handleResetFilters = () => {
    setSelectedGenre([]);
    setMovieYear(null);
    setVoteAverage(null);
    setPage(1);
    setMovies([]);
    setHasMore(true);
    setShowFilter(false);
  };

  const handleShowMostWatchedList = () => {
    if (movies.length > 0 && !isLoading) {
      return <MostWatchedList movies={movies} />;
    } else if (!isLoading) {
      return (
        <div className={styles["most-watched-page__no-movies"]}>
          No movies found. Please try again :)
        </div>
      );
    } else <div></div>;
  };

  return (
    <div className={styles["most-watched-page"]}>
      <MovieFilters
        genres={genres}
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre || []}
        movieYear={movieYear}
        setMovieYear={setMovieYear}
        voteAverage={voteAverage}
        setVoteAverage={setVoteAverage}
        handleResetFilters={handleResetFilters}
        handleSearch={handleSearch}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
      {handleShowMostWatchedList()}
      <div className={styles["observer-ref"]} ref={observerRef} />
      {isLoading && <Loading />}
    </div>
  );
}

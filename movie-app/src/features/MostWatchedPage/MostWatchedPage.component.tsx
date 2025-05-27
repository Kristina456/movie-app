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
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genre, setGenre] = useState<number | null>(null);
  const [movieYear, setMovieYear] = useState<number | null>(null);
  const [voteAverage, setVoteAverage] = useState<number | null>(null);

  const fetchMovies = async (
    page: number,
    year?: number,
    genre?: string,
    voteAverage?: number
  ) => {
    setIsLoading(true);

    const genreQuery = genre ? `&with_genres=${genre}` : "";
    const yearQuery = year ? `&primary_release_year=${year}` : "";
    const voteAverageQuery = voteAverage
      ? `&vote_average.gte=${voteAverage}&vote_average.lte=${voteAverage}`
      : "";

    try {
      const res = await fetch(
        `/api/most-watched?page=${page}${yearQuery}${genreQuery}${voteAverageQuery}`
      );
      const data: MoviesData = await res.json();

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
      const res = await fetch(`/api/genre`);
      const data: MoviesGenres = await res.json();
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
      genre !== null ? genre.toString() : undefined,
      voteAverage !== null ? voteAverage : undefined
    );
  }, [page]);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [genre, movieYear, voteAverage]);

  const observerRef = useInfiniteScroll(
    () => setPage((prev) => prev + 1),
    hasMore,
    isLoading
  );

  const handleResetFilters = () => {
    setGenre(null);
    setMovieYear(null);
    setVoteAverage(null);
    setPage(1);
    setMovies([]);
    setHasMore(true);
  };

  return (
    <div className={styles["most-watched-page"]}>
      <MovieFilters
        genres={genres}
        setGenre={setGenre}
        movieYear={movieYear}
        setMovieYear={setMovieYear}
        voteAverage={voteAverage}
        setVoteAverage={setVoteAverage}
        handleResetFilters={handleResetFilters}
      />
      <MostWatchedList movies={movies} />
      <div ref={observerRef} />
      {isLoading && <Loading />}
    </div>
  );
}

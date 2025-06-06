export interface MoviesData {
  results: MovieItem[];
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  genres: MovieGenre[];
  runtime: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface MovieGenre {
  id: number;
  name: string;
}

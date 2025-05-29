import Link from "next/link";
import styles from "./TopRatedMovie.module.scss";
import { MovieItem } from "@/types/MoviesData.dto";
import Image from "next/image";

interface Props {
  movie: MovieItem;
}

export function TopRatedMovie({ movie }: Props) {
  return (
    <div className={styles["top-rated-movie"]}>
      <Link
        href={{
          pathname: `/movies/${movie.id}`,
        }}
        className={styles["top-rated-movie__link"]}
      >
        <div className={styles["top-rated-movie__backdrop"]}>
          {movie.backdrop_path && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`}
              alt={`${movie.title} poster`}
              width={250}
              height={100}
            />
          )}
        </div>
        <div className={styles["top-rated-movie__wrapper"]}>
          <div className={styles["top-rated-movie__title"]}>{movie.title}</div>
          <div className={styles["top-rated-movie__overview"]}>
            {movie.overview.slice(0, 200) || "There is no overview for now"}...
          </div>
        </div>
      </Link>
    </div>
  );
}

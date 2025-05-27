"use client";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import { FavoriteDropdown } from "../FavoriteDropdown/FavoriteDropdown.component";
import { SearchBar } from "../SearchBar/SearchBar.component";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className={styles["navigation"]}>
      <div>
        <Link className={styles["navigation__link"]} href="/">
          <Image
            src="images/logo.svg"
            alt="logo image"
            width={100}
            height={100}
          ></Image>
        </Link>
      </div>
      <div className={styles["navigation__links"]}>
        <div className={styles["navigation__link"]}>
          <SearchBar />
        </div>
        <Link
          className={`${styles["navigation__link"]} ${pathname === "/" ? styles["navigation__link--active"] : ""}`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${styles["navigation__link"]} ${pathname === "/most-watched" ? styles["navigation__link--active"] : ""}`}
          href="./most-watched"
        >
          Most watched
        </Link>
        <div className={styles["navigation__link"]}>
          <FavoriteDropdown />
        </div>
      </div>
    </div>
  );
}

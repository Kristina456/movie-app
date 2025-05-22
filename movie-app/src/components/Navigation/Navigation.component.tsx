import Link from "next/link";
import styles from "./Navigation.module.scss";
import { FavoriteDropdown } from "../FavoriteDropdown/FavoriteDropdown.component";
import { SearchBar } from "../SearchBar/SearchBar.component";

export function Navigation() {
  return (
    <div className={styles["navigation"]}>
      <div>
        <Link className={styles["navigation__link"]} href="/">
          Logo
        </Link>
      </div>
      <div className={styles["navigation__links"]}>
        <div className={styles["navigation__link"]}>
          <SearchBar />
        </div>
        <Link className={styles["navigation__link"]} href="/">
          Home
        </Link>
        <Link className={styles["navigation__link"]} href="./most-watched">
          Most watched
        </Link>
        <div className={styles["navigation__link"]}>
          <FavoriteDropdown />
        </div>
      </div>
    </div>
  );
}

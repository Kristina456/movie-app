"use client";
import Link from "next/link";
import styles from "./Navigation.module.scss";
import { FavoriteDropdown } from "../FavoriteDropdown/FavoriteDropdown.component";
import { SearchBar } from "../SearchBar/SearchBar.component";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuLinks = (
    <div className={styles["navigation__wrapper"]}>
      <div
        className={`${styles["navigation__link"]} ${styles["navigation__search-bar"]}`}
      >
        <SearchBar />
      </div>
      <div className={styles["navigation__links-wrapper"]}>
        <Link
          className={`${styles["navigation__link"]}  ${pathname === "/" ? styles["navigation__link--active"] : ""}`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${styles["navigation__link"]} ${pathname === "/most-watched" ? styles["navigation__link--active"] : ""}`}
          href="/most-watched"
        >
          Most watched
        </Link>
      </div>
      <div
        className={`${styles["navigation__link"]} ${styles["navigation__favorite"]} `}
      >
        <FavoriteDropdown />
      </div>
    </div>
  );

  const handleHamburgerClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className={styles["navigation"]}>
      <div>
        <Link className={styles["navigation__link"]} href="/">
          <Image
            src="./images/logo.svg"
            alt="logo image"
            width={100}
            height={50}
          />
        </Link>
      </div>
      <div className={styles["navigation__hamburger"]}>
        <button onClick={handleHamburgerClick}>
          <Image
            src="./images/burger-menu.svg"
            alt="hamburger"
            width={30}
            height={30}
          />
        </button>
      </div>
      {/* desktop */}
      <div
        className={`${styles["navigation__links"]} ${styles["navigation__links--desktop"]}`}
      >
        {menuLinks}
      </div>
      {/* Mobile */}
      {menuIsOpen && (
        <div
          className={`${styles["navigation__links"]} ${styles["navigation__links--mobile"]}`}
        >
          {menuLinks}
        </div>
      )}
    </div>
  );
}

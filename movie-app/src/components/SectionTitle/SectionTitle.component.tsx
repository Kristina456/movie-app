import styles from "./SectionTitle.module.scss";

interface Props {
  title: string;
}

export function SectionTitle({ title }: Props) {
  return <h2 className={styles["section-title"]}>{title}</h2>;
}

import clsx from "clsx";
import styles from "./Loading.module.scss";

export interface ILoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

export function Loading({ size = "md", fullScreen = false, text }: ILoadingProps) {
  return (
    <div
      className={clsx(styles.loadingWrapper, {
        [styles["loadingWrapper--full-screen"]]: fullScreen,
      })}
    >
      <div
        className={clsx(styles.spinner, styles[`spinner--${size}`])}
        role="status"
        aria-label="Loading"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}

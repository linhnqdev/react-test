import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./LoadMoreButton.module.scss";

export interface ILoadMoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function LoadMoreButton({ label, className, type = "button", ...rest }: ILoadMoreButtonProps) {
  return (
    <button type={type} className={clsx(styles.root, className)} {...rest}>
      {label}
    </button>
  );
}


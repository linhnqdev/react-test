import clsx from "clsx";
import { HTMLAttributes } from "react";

import styles from "./Card.module.scss";

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  hover?: boolean;
}

export function Card({ title, description, footer, hover = false, className, children, ...props }: ICardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        hover && styles["card--hover"],
        className
      )}
      {...props}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children && <div className={styles.content}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}

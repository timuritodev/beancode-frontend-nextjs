import { FC } from "react";
import arrow_next_2 from "../../images/arrow_next_2.svg";
import arrow_prev_2 from "../../images/arrow_prev_2.svg";
import styles from "./styles.module.scss";

interface IArrowProps {
  currentSlide: number;
  slideCount: number;
}

export const CustomPrevArrow = () => (
  <img className={styles.slickPrev} src={arrow_prev_2} alt="Предыдущий слайд" />
);

export const CustomNextArrow = () => (
  <img className={styles.slickNext} src={arrow_next_2} alt="Следующий слайд" />
);

export const SlickArrowLeft: FC<IArrowProps> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <img
    {...props}
    className={`${styles.slickPrev} ${currentSlide === 0 ? styles.slickDisabled : ""}`}
    aria-hidden="true"
    aria-disabled={currentSlide === 0}
    src={arrow_next_2}
    alt="Следующий слайд"
  />
);

export const SlickArrowRight: FC<IArrowProps> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <img
    {...props}
    className={`${styles.slickNext} ${currentSlide === slideCount - 1 ? styles.slickDisabled : ""}`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1}
    src={arrow_prev_2}
    alt="Предыдущий слайд"
  />
);

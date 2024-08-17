/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import arrow_next_2 from "../../images/arrow_next_2.svg";
import arrow_prev_2 from "../../images/arrow_prev_2.svg";

interface IArrowProps {
  currentSlide: number;
  slideCount: number;
}

export const CustomPrevArrow = () => (
  <img className="slick-prev" src={arrow_prev_2} alt="Previous" />
);

export const CustomNextArrow = () => (
  <img className="slick-next" src={arrow_next_2} alt="Next" />
);

export const SlickArrowLeft: FC<IArrowProps> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <img
    {...props}
    className={`slick-prev slick-arrow${
      currentSlide === 0 ? " slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    src={arrow_next_2}
    alt="Next"
  />
);

export const SlickArrowRight: FC<IArrowProps> = ({
  currentSlide,
  slideCount,
  ...props
}) => (
  <img
    {...props}
    className={`slick-next slick-arrow${
      currentSlide === slideCount - 1 ? " slick-disabled" : ""
    }`}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    src={arrow_prev_2}
    alt="Previous"
  />
);

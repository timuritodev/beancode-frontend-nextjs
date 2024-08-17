/* eslint-disable @typescript-eslint/no-unused-vars */
import "./ProductsSlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FC } from "react";
import { IProductsProp } from "../../types/Product.types";
import { SmallProduct } from "../SmallProduct/SmallProduct";
import { useResize } from "../../hooks/useResize";

export const ProductsSlider: FC<IProductsProp> = ({ data }) => {
  const { width } = useResize();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: width > 767 ? true : false,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "35px",
        },
      },
    ],
  };

  return (
    <div className="slick-slider_container">
      <Slider {...settings} className="slick-slider">
        {data.map((item) => (
          <SmallProduct key={item.id} data={item} />
        ))}
      </Slider>
    </div>
  );
};

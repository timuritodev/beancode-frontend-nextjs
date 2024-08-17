import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./ProductImagesSlider.css";

interface IProductImagesSliderProps {
  images: string[] | undefined;
}

export const ProductImagesSlider: FC<IProductImagesSliderProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
          breakpoint: 767,
          settings: {
            arrows: false,
            dots: true,
          },
        },
      ],
  };

  return (
    <div className="product-images-slider_container">
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div key={index} className="product-image-wrapper">
            <img src={image} alt={`Product Image ${index + 1}`} className="product-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

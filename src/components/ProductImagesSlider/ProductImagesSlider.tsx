import React, { FC } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./style.module.scss";
import Image from "next/image";

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
    <div className={styles.slider}>
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div key={index} className={styles.wrapper}>
            <Image src={image} alt={`Product Image ${index + 1}`} className={styles.image} width={85} height={80}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

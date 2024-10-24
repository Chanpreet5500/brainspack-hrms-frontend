"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick"

interface BackgroundImgProps {
  images: string[]
}
const BackgroundImgSlider: React.FC<BackgroundImgProps> = ({ images }) => {
  const settings = {
    adaptiveHeight: false,
    variableWidth: false,
    dots: false,
    fade: true,
    infinite: true,
    speed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    autoplay: true,
    autoplaySpeed: 7000,
    height: true,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings}>
      {images?.map((ele, index) => {
        return (
          <div className="w-full h-[100vh]" key={index}>
            <Image
              src={ele}
              alt="background-images"
              layout="fill"
              priority
            />
          </div>
        )
      })}
    </Slider>
  );
};
export default BackgroundImgSlider;

"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

interface BackgroundImgProps {
  images: string[];
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
          <div key={index} className="relative w-full h-[100vh]">
            <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50">
              <Image
                src={ele}
                alt="background-images"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </Slider>
  );
};
export default BackgroundImgSlider;

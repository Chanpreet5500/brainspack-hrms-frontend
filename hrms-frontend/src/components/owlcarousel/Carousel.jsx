"use client"
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const SimpleSlider = () => {
  const settings = {
    adaptiveHeight: false,
    variableWidth: false,
    dots: false,
    fade: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    autoplay:true,
    autoplaySpeed: 4000,
    height:true,
    arrows:false,
    pauseOnHover: false,
  };
  const images = ["/images/admin-bg.jpg", "/images/admin2-bg.jpg"];
  return (
    <Slider {...settings}>
      {images.map((ele,index)=>{
        return(
          <div className="w-full h-[100vh]" key={index}>
        <Image
              src={ele}
              alt="galaxy-background"
              objectFit="cover" 
              width={500}
              height={500}
              priority
              className="w-full h-full"
            />
      </div>
        )
      })}
    </Slider>
  );
};
export default SimpleSlider;

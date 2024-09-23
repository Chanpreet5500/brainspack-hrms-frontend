"use client"
import React from "react";
import Slider from "react-slick";

const SimpleSlider =() => {
  const settings = {
    adaptiveHeight:false,
    variableWidth:false,
    dots: false,
    fade: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    autoplay:true,
    autoplaySpeed: 3000,
    height:true,
    arrows:false,
    pauseOnHover: false,
  };
  const images = ['/images/admin-bg.jpg', '/images/galaxy.jpg']
  return (
    <Slider {...settings}>
      {images.map((ele,index)=>{
        return(
          <div className="w-full h-screen" key={index}>
        <img src={ele} alt='background-image' className="w-full h-full object-cover"/>
      </div>
        )
      })}
      
      {/* <div>
        <h3 className="text-3xl">2</h3>
      </div>
      <div>
        <h3 className="text-3xl">3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div> */}
    </Slider>
  );
}
export default SimpleSlider;
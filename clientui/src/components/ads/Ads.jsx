import React, {useEffect, useState} from 'react'
import adbanner from '../../media/BANNER-LEHENGA-SAREE.jpg'
import ad2 from '../../media/kurti-banner.jpg'
import ad3 from '../../media/indowesternadd.jpeg'
import './ads.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function Ads() {
    const banner = [adbanner, ad2, ad3];
    const [activeSlide, setActiveSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the auto-slide speed in milliseconds
    beforeChange: (current, next) => setActiveSlide(next),
  };
  const slides = banner.map((src, index) => (
    <div key={index}>
      <img src={src} className='slide' alt="" />
    </div>
  ));
  useEffect(() => {
    // Cleanup function to clear the interval when the component is unmounted
    const interval = setInterval(() => {
      // Increment active slide or reset to 0 when reaching the last slide
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, sliderSettings.autoplaySpeed);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [sliderSettings.autoplaySpeed]);
  

  
  return (
    <div className='Ads'>
        <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div key={index}>{slide}</div>
        ))}
      </Slider>
    </div>
  )
}

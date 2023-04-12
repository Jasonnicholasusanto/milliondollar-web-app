import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../Card/Card.jsx';
import DPCard from '../DPCard/DPCard.jsx';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ItemCarousel.scss';
import useFetch from '../../hooks/useFetch.js';

const ItemCarousel = ({ url, header }) => {

    const { data, loading, error } = useFetch(
        url
    );

    const items = data;

    console.log(items);

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    // className: "itemSlider",
    prevArrow: <CustomPrevArrow/>,
    nextArrow: <CustomNextArrow/>,
  };

  if (!data || data.length === 0) {
    return (
      <div className="itemCarousel">
        <h1>{header}</h1>
        No items to display
      </div>
    );
  }

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-prev" onClick={onClick}>
        <ArrowBackIosIcon style={{ color: "black" }} />
      </div>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="slick-arrow slick-next" onClick={onClick}>
        <ArrowForwardIosIcon style={{ color: "black" }} />
      </div>
    );
  }

  return (
    <div className='itemCarousel'>
        <h1>{header}</h1>

        <div className="slider">

            {error ? "Oops! Something went wrong." : 
            (loading ? "loading..." : 
            (header === "Posters" ? 
                <Slider {...settings}>
                    {items.map((item) => (
                        <Card item={item} key={item?.attributes?.id}/>
                    ))}
                </Slider> : 
                <Slider {...settings}>
                    {items.map((item) => (
                        <DPCard item={item} key={item?.attributes?.id}/>
                    ))}
                </Slider>)
            )} 
        </div>

    </div>
  );
};

export default ItemCarousel;

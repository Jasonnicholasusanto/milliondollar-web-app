import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile, isTablet } from 'react-device-detect';
import Card from '../Card/Card.jsx';
import DPCard from '../DPCard/DPCard.jsx';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ItemCarousel.scss';
import useFetch from '../../hooks/useFetch.js';
import { Link } from 'react-router-dom';


const ItemCarousel = ({ url, header }) => {

    const { data, loading, error } = useFetch(
        url
    );

    const items = data;

  if (!data || data.length === 0) {
    return (
      <div className="itemCarousel">
        <h1>{header}</h1>
        No items to display
      </div>
    );
  }

  function getDeviceType() {
    if (isMobile) {
      return 'mobile';
    } else if (isTablet) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  function CustomArrow({ onClick, direction }) {
    const Icon = direction === 'left' ? ArrowBackIosIcon : ArrowForwardIosIcon;
    return (
      <button onClick={onClick}>
        <Icon />
      </button>
    );
  }
  

  return (
    <div className='itemCarousel'>
        <Link className="header" to="/">
          <h1>{header}</h1>

          <div className="arrow">
            <ArrowForwardIosIcon style={{fontSize: "18px", color: "black"}}/>
          </div>
        </Link>

        <div className="slider">

          {error ? "Oops! Something went wrong." : 
          (loading ? "loading..." : 
          (header === "Posters" ? 
              <Carousel 
                showDots={true} 
                swipeable={false}
                responsive={responsive} 
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={getDeviceType()}
                keyBoardControl={true}
                // customLeftArrow={<CustomArrow direction="left" />}
                // customRightArrow={<CustomArrow direction="right" />}
              >
                  {items.map((item) => (
                      <Card item={item} key={item?.attributes?.id}/>
                  ))}
              </Carousel> : 
              <Carousel 
                showDots={true} 
                swipeable={false}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={getDeviceType()}
                keyBoardControl={true}
                // customLeftArrow={<CustomArrow direction="left" />}
                // customRightArrow={<CustomArrow direction="right" />}
              >
                  {items.map((item) => (
                      <DPCard item={item} key={item?.attributes?.id}/>
                  ))}
              </Carousel>)
            )
          }
        </div>

    </div>
  );
};

export default ItemCarousel;

import React, { useState, useEffect } from 'react'
import "./DigitalPlanner.scss";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Accordion from '../../components/Accordion/Accordion';
import Contact from "../../components/Contact/Contact.jsx";
import Review from '../../components/Review/Review';
import StraightenIcon from '@mui/icons-material/Straighten';
import { Link, useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
      main: '#000000',
      darker: '#000000',
      },
      secondary: {
      main: '#ffffff',
      },
  },
});

const DigitalPlanner = () => {

  const id = useParams().id;
  const { data, loading, error } = useFetch(`/digital-planners/${id}?populate=*`);

  // To convert Date data type to String.
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };

  // This function is to retrieve the product's tags.
  const productTags = () => {
    var tags = "";
    var dataLength = data?.attributes?.digital_planner_subcategories?.data?.length;

    for (var i = 0; i<dataLength; i++){
      
      if(i+1 === dataLength){
        tags += data?.attributes?.digital_planner_subcategories?.data[i]?.attributes?.title;
      } else {
        tags += data?.attributes?.digital_planner_subcategories?.data[i]?.attributes?.title + ", ";
      }
    }

    return tags;
  }

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);
  const [oldPrice, setOldPrice] = useState(data?.attributes?.oldPrice);
  const [price, setPrice] = useState(data?.attributes?.price);

  useEffect(() => {
    setPrice(data?.attributes?.price);
    setOldPrice(data?.attributes?.oldPrice);
    setSelectedImg(0);
  }, [data])

  const handleImageClick = (index) => {
    setSelectedImg(index);
  };

  return (
    <div className="digitalPlanner">

      <div className="wrapper">

        {loading ? ("Product loading ...") : (
          <>
            <div className="left">
              <div className="productImages">
                <div className="images">
                    {data?.attributes?.images?.data?.map((image, index) => (
                    <img
                        key={image?.id}
                        src={`${process.env.REACT_APP_UPLOAD_URL}${image?.attributes?.url}`}
                        alt={image?.attributes?.name}
                        onClick={() => handleImageClick(index)}
                    />
                    ))}
                </div>

                <div className="mainImg">
                    <img 
                        src={`${process.env.REACT_APP_UPLOAD_URL}${data?.attributes?.images?.data[selectedImg]?.attributes?.url}`}
                        alt={data?.attributes?.title}
                    />
                </div>
              </div>

              <div className="reviewSection">
                <hr/>
                <Review ratings={data?.attributes?.reviews?.ratings}/>
              </div>
              
            </div>

            <div className="right">
              <h1>{data?.attributes?.title}</h1>
              <span className='createdBy'>
                By&nbsp;
                <Link className="brandingLink" to="/">
                  {data?.attributes?.branding}
                </Link>
              </span>

              <div className="priceContainer">
                {oldPrice !== price &&
                  <span className='oldPrice'>
                    ${(oldPrice.toFixed(2) * quantity).toFixed(2)}
                  </span>
                }

                <span className="price" >${(price * quantity).toFixed(2)}</span>
              </div>

              <p className='itemDescription'>
                {data?.attributes?.description === "" ? "There is no description for this poster." : data?.attributes?.description}
              </p>

              <hr/>
              
              <div className="quantity">
                <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev-1)}>-</button>
                <p>
                  {quantity}
                </p>
                <button onClick={() => setQuantity(prev => prev+1)}>+</button>
              </div>

              <button className="add">
                <AddShoppingCartIcon/>
                ADD TO CART
              </button>

              <div className="links">

                <button className='wishlist' onClick={() => setWish(!wish)}>
                  {!wish && <FavoriteBorderIcon/>}
                  {wish && <FavoriteIcon/>}
                  ADD TO WISHLIST
                </button>

                {/* <button className="compare" onClick={() => setCompare(!compare)}>
                  <CompareArrowsIcon/>
                  ADD TO COMPARE
                </button> */}

              </div>

              <div className="info">
                <span><b>Artist:</b> {data?.attributes?.artist}</span>
                <span><b>Date:</b> {data?.attributes?.date}</span>
                <span><b>File format:</b> {data?.attributes?.fileFormat}</span>
                <span><b>Tags:</b> {productTags()}</span>
              </div>

              <hr />

              <Accordion/>

            </div>
          </>
        )}
      </div>

      <Contact/>
    </div>
  )
}

export default DigitalPlanner
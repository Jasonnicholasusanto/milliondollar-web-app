import React, { useState, useEffect } from 'react'
import "./Poster.scss";
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

const Poster = () => {

  const id = useParams().id;
  const { data, loading, error } = useFetch(`/posters/${id}?populate=*`);

  // To convert Date data type to String.
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };

  // To retrieve the poster's available sizes.
  const productSizes = () => {
    var sizes = "";
    var dataLength = data?.attributes?.prices?.prices?.length;

    for(var i=0; i<dataLength; i++){

      if(i+1 === dataLength){
        sizes += data?.attributes?.prices?.prices[i]?.size;
      } else {
        sizes += data?.attributes?.prices?.prices[i]?.size + ", ";
      }
    }

    return sizes;
  }

  // This function is to retrieve the product's tags.
  const productTags = () => {
    var tags = "";
    var dataLength = data?.attributes?.sub_categories?.data?.length;

    for (var i = 0; i<dataLength; i++){
      
      if(i+1 === dataLength){
        tags += data?.attributes?.sub_categories?.data[i]?.attributes?.title;
      } else {
        tags += data?.attributes?.sub_categories?.data[i]?.attributes?.title + ", ";
      }
    }

    return tags;
  }

  // This function retrieves the product's sizes as options in a dropdown element.
  const dropDownData = () => {
    var pricesData = [];
    var pricesDataLength = data?.attributes?.prices?.prices?.length;

    for(var i=0; i<pricesDataLength; i++){
      pricesData[i] = data?.attributes?.prices?.prices[i]?.size + " - $" + data?.attributes?.prices?.prices[i]?.price.toFixed(2);
    }

    return pricesData;
  }

  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);
  const [oldPrice, setOldPrice] = useState();
  const [price, setPrice] = useState(data?.attributes?.price);
  const [size, setSize] = useState();

  useEffect(() => {
    setPrice(data?.attributes?.prices?.prices[0]?.price);
    setOldPrice(data?.attributes?.prices?.prices[0]?.oldPrice);
    setSize(data?.attributes?.prices?.prices[0]?.size);
  }, [data])

  // This function handles the pricing when client chooses a certain poster size.
  const handleSizeChange = (e) => {
    setSize(e.target.value);

    var s = e.target.value;
    var pricesDataLength = data?.attributes?.prices?.prices?.length;

    for (var i = 0; i < pricesDataLength; i++) {
      if (s.includes(data?.attributes?.prices?.prices[i]?.size)) {
        setOldPrice(data?.attributes?.prices?.prices[i]?.oldPrice);
        setPrice(data?.attributes?.prices?.prices[i]?.price);
      }
    }
  };

  return (
    <div className="product">

      <div className="wrapper">

        {loading ? ("Product loading ...") : (
          <>
            <div className="left">
              <div className="productImages">
                <div className="images">
                    <img 
                      src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.attributes?.url} 
                      alt="" 
                      onClick={e => setSelectedImg("img")}
                    />

                    <img 
                      src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img2?.data?.attributes?.url} 
                      alt="" 
                      onClick={e => setSelectedImg("img2")}
                    />
                  </div>

                  <div className="mainImg">
                    <img src={process.env.REACT_APP_UPLOAD_URL + data?.attributes[selectedImg]?.data?.attributes?.url} alt=""/>
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
                <Link className="brandingLink" to="/dashboard/1">
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

              <div className="dropdown">
                <form className='form'>
                    <h1 className='size'>
                        <StraightenIcon/>
                        SIZE
                    </h1>

                    <select className='dropdownList' value={size} onChange={handleSizeChange}>
                      {dropDownData()?.map(a=>(
                        <option value={a}>{a}</option>
                      ))}
                    </select>
                </form>
              </div>
              
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
                <span><b>Poster Material:</b> {data?.attributes?.material}</span>
                <span><b>Sizes:</b> {productSizes()}</span>
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

export default Poster
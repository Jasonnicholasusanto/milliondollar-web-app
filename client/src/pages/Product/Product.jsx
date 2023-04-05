import React, { useState } from 'react'
import "./Product.scss";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BalanceIcon from '@mui/icons-material/Balance';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Accordion from '../../components/Accordion/Accordion';
import Contact from "../../components/Contact/Contact.jsx";
import Review from '../../components/Review/Review';
import { testProductData } from '../../testData/testProductData';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Product = () => {

  const id = useParams().id;
  const { data, loading, error } = useFetch(`/posters/${id}?populate=*`);

  console.log();

  // To convert Date data type to String.
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
  };

  // To retrieve the poster's creation date.
  const productDate = () => {
    return testProductData.date.yyyymmdd();
  }

  // To retrieve the poster's available sizes.
  const productSizes = () => {
    var sizes = "";

    for(var i=0; i<testProductData.prices.length; i++){

      if(i+1 === testProductData.prices.length){
        sizes += testProductData.prices[i].size;
      } else {
        sizes = sizes + testProductData.prices[i].size + ", ";
      }
    }

    return sizes;
  }

  // To retrieve the product's tags
  const productTags = () => {
    var tags = "";

    for(var i=0; i<testProductData.categories.length; i++){

      if(testProductData.subcategories.length === 0){
        if(i+1 === testProductData.categories.length){
          tags += testProductData.categories[i];
        } else {
          tags += testProductData.categories[i] + ", ";
        }
      } else {
        tags += testProductData.categories[i] + ", ";
      }

    }

    for(var j=0; j<testProductData.subcategories.length; j++){

      if(j+1 === testProductData.subcategories.length){
        tags += testProductData.subcategories[j];
      } else {
        tags += testProductData.subcategories[j] + ", ";
      }
      
    }

    return tags;
  }

  // This function will get the sizes available for the poster
  const getSizes = () => {
    var sizes = [];

    for(var i=0; i<testProductData.prices.length; i++){
      sizes[i] = testProductData.prices[i].size;
    }

    return sizes;
  }

  // This function retrieves the product's sizes as options in a dropdown element.
  const dropDownData = () => {
    var data = [];

    for(var i=0; i<testProductData.prices.length;i++){
      data[i] = testProductData.prices[i].size + " - $" + testProductData.prices[i].price;
    }

    return data;
  }

  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);

  const [oldPrice, setOldPrice] = useState(testProductData.prices[0].oldPrice);
  const [price, setPrice] = useState(testProductData.prices[0].price);
  const [size, setSize] = useState(testProductData.prices[0].size);

  // This function handles the pricing when client chooses a certain poster size.
  const handleSizeChange = (e) => {
    setSize(e.target.value);

    var s = e.target.value;

    for (var i = 0; i < testProductData.prices.length; i++) {
      if (s.includes(testProductData.prices[i].size)) {
        setOldPrice(testProductData.prices[i].oldPrice);
        setPrice(testProductData.prices[i].price);
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
                <Review/>
              </div>
              
            </div>

            <div className="right">
              <h1>{data?.attributes?.title}</h1>
              <span className='createdBy'>By {data?.attributes?.branding}</span>

              <div className="priceContainer">
                {oldPrice !== price &&
                  <span className='oldPrice'>
                    ${(oldPrice.toFixed(2) * quantity).toFixed(2)}
                  </span>
                }

                <span className="price" >${(price.toFixed(2) * quantity).toFixed(2)}</span>
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
                <span>Artist: {data?.attributes?.artist}</span>
                <span>Date: {data?.attributes?.date}</span>
                <span>Poster Material: {data?.attributes?.material}</span>
                <span>Sizes: {productSizes()}</span>
                <span>Tags: {productTags()}</span>
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

export default Product
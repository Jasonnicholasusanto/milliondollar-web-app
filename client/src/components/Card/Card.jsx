import React from 'react'
import "./Card.scss";
import {NavLink} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Card = ({ item }) => {

  const totalRatings = () => {
    var numRatings = 0;
    
    for(var i=0; i<5; i++){
      numRatings += item?.attributes.reviews.ratings[i];
    }

    return numRatings;
  }

  const averageRating = () => {
    var total = 0;
    var avg = 0;

    for(var i=0; i<5; i++){
      total += (i+1) * item?.attributes.reviews.ratings[i];
    }

    avg = Math.floor(total / totalRatings());

    return avg;

  }
  
  return (
    <NavLink className="link" to={`/poster/${item.id}`}>
        <div className="card">
            <div className="image">
                {item?.attributes.isNew ? <span>New Release</span> : (item?.attributes.tag && <span>{item?.attributes.tag}</span>)}
                <img src={process.env.REACT_APP_UPLOAD_URL+item.attributes?.img?.data?.attributes?.url} alt="" className="mainImg" />
                <img src={process.env.REACT_APP_UPLOAD_URL+item.attributes?.img2?.data?.attributes?.url} alt="" className="secondImg" />
            </div>

            { (item?.attributes.title.length) > 29 ? <h2>{item?.attributes.title.substring(0,26)}...</h2> : <h2>{item?.attributes.title.substring(0,29)}</h2>}



            {/* {item?.attributes.branding === "" ? <h3>By {item?.attributes.artist}</h3> : <h3>By {item?.attributes?.user?.data?.attributes?.username}</h3>} */}

            <h3>By {item?.attributes?.user?.data?.attributes?.username}</h3>

            <div className="rating">
                <span className="star">
                    {averageRating() >= 1 ? <StarIcon fontSize='small'/> : <StarBorderIcon fontSize='small'/>}
                </span>
                <span className="star">
                    {averageRating() >= 2 ? <StarIcon fontSize='small'/> : <StarBorderIcon fontSize='small'/>}
                </span>
                <span className="star">
                    {averageRating() >= 3 ? <StarIcon fontSize='small'/> : <StarBorderIcon fontSize='small'/>}
                </span>
                <span className="star">
                    {averageRating() >= 4 ? <StarIcon fontSize='small'/> : <StarBorderIcon fontSize='small'/>}
                </span>
                <span className="fa fa-star">
                    {averageRating() >= 5 ? <StarIcon fontSize='small'/> : <StarBorderIcon fontSize='small'/>}
                </span>

                <span className='numRatings'>({totalRatings()})</span>
            </div>
            

            <div className="prices">
                {item?.attributes.prices.prices[0].oldPrice !== item?.attributes.prices.prices[0].price &&
                  <h3 className='oldPrice'>
                    ${item?.attributes.prices.prices[0].oldPrice.toFixed(2)}
                  </h3>
                }
                <h3>${item?.attributes.prices.prices[0].price.toFixed(2)}</h3>
            </div>
        </div>
    </NavLink>
  )
}

export default Card
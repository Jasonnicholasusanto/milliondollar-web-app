import React from 'react'
import "./DPCard.scss";
import {Link, NavLink} from "react-router-dom";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const DPCard = ({ item }) => {

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

  const itemTag = () => {
    var isNew = item?.attributes.isNew;
    var tagging = item?.attributes.tag;

    if(isNew){
      return "New Release";
    } else if (tagging !== "") {
      return tagging;
    } else {
      return ""
    }
  }

  return (
    <NavLink className="link" to={`/digital-planner/${item.id}`}>
        <div className="card">
            <div className="image">
                {item?.attributes.isNew ? <span>New Release</span> : (item?.attributes.tag && <span>{item?.attributes.tag}</span>)}
                <img src={`${process.env.REACT_APP_UPLOAD_URL}${item?.attributes?.images?.data[0]?.attributes?.url}`} alt="" className="mainImg" />
                <img src={`${process.env.REACT_APP_UPLOAD_URL}${item?.attributes?.images?.data[1]?.attributes?.url}`} alt="" className="secondImg" />
            </div>

            { (item?.attributes.title.length) > 29 ? <h2>{item?.attributes.title.substring(0,26)}...</h2> : <h2>{item?.attributes.title.substring(0,29)}</h2>}



            {/* {item?.attributes.branding === "" ? <h3>By {item?.attributes.artist}</h3> : <h3>By {item?.attributes.branding}</h3>} */}

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
                {item?.attributes.oldPrice !== item?.attributes.price &&
                  <h3 className='oldPrice'>
                    ${item?.attributes.oldPrice.toFixed(2)}
                  </h3>
                }
                <h3>${item?.attributes.price.toFixed(2)}</h3>
            </div>
        </div>
    </NavLink>
  )
}

export default DPCard
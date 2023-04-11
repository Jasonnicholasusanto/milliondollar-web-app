import React, { useState } from 'react';
import './Homepage.scss';
import Card from '../../components/Card/Card.jsx';
import useFetch from '../../hooks/useFetch';
import ItemCarousel from '../../components/ItemCarousel/ItemCarousel';

const Homepage = () => {

  const [profileImg, setProfileImg] = useState(null);

  return (
    <div className="userHomepage">

      <div className="profile">
        {/* <AccountCircleIcon className='profileImg'/> */}
        {profileImg === null 
          ? <img className='profileImg' src="/img/profile-user.png"/> 
          : <img className='profileImg' src="" alt="Profile Image"/>}

        <div className="profileInfo">
          <h1>Username</h1>

          <h3>
            <span>First Name </span>
            <span>Last Name</span>
          </h3>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae cumque magnam illo eveniet, delectus, velit ipsum rem incidunt cum atque aliquid deserunt id tenetur sint consequuntur voluptate laboriosam qui! Laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia adipisci, doloremque, eligendi ducimus consequuntur dolores provident nemo debitis temporibus consectetur tempore maiores magnam porro quos commodi facilis ipsa magni beatae.</p>
        </div>
        
      </div>

      <div className="carousels">

          <ItemCarousel className='postersCarousel' header={"Posters"} url={'/posters?populate=*'}/>

          <ItemCarousel className='digitalPlannersCarousel' header={"Digital Planners"} url={'/digital-planners?populate=*'}/>

      </div>

    </div>
  )
}

export default Homepage
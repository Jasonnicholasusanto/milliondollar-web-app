import React, { useState } from 'react';
import './Homepage.scss';
import Card from '../../components/Card/Card.jsx';
import useFetch from '../../hooks/useFetch';
import ItemCarousel from '../../components/ItemCarousel/ItemCarousel';
import { Link } from 'react-router-dom';

const Homepage = () => {

  // const [data, loading, error] = useFetch(
  //   ``
  // );

  const [profileImg, setProfileImg] = useState(null);
  const [username, setUsername] = useState('Jasonnicholassusanto5602');
  const [firstName, setFirstName] = useState('Jason');
  const [lastName, setLastName] = useState('Susanto');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae tenetur blanditiis ipsum nesciunt esse, necessitatibus maxime quas quod praesentium laboriosam soluta repellendus vel, fuga tempora, porro dolor! Unde, quod velit!')

  return (
    <div className="userHomepage">

      <div className="profile">

        <div class="profile-header">
          <img class="cover-image" src="/img/cover-image.jpg" alt="Cover Image"/>
          <img class="profile-image" src="/img/profile-user.png" alt="Profile Image"/>
          {/* <h1 class="profile-name">John Doe</h1> */}
        </div>

        <div className="profileInfo">
          <h1>{username}</h1>

          <h3 className="name">
            <span>{firstName} </span>
            <span>{lastName}</span>
          </h3>

          <p className="description">
            {description}
          </p>
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
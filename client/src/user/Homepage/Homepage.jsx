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
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="userHomepage">

      {/* <div className="profile">
        {profileImg === null 
          ? <img className='profileImg' src="/img/profile-user.png"/> 
          : <img className='profileImg' src="" alt="Profile Image"/>}

        <div className="profileInfo">
          
          <Link className="username" to="/">
            <h1>Username</h1>
          </Link>

          <h3>
            <span>First Name </span>
            <span>Last Name</span>
          </h3>

          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae cumque magnam illo eveniet, delectus, velit ipsum rem incidunt cum atque aliquid deserunt id tenetur sint consequuntur voluptate laboriosam qui! Laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia adipisci, doloremque, eligendi ducimus consequuntur dolores provident nemo debitis temporibus consectetur tempore maiores magnam porro quos commodi facilis ipsa magni beatae.</p>
        </div>
        
      </div> */}

      <div className="profile">

        <div class="profile-header">
          <img class="cover-image" src="/img/cover-image.jpg" alt="Cover Image"/>
          <img class="profile-image" src="/img/profile-user.png" alt="Profile Image"/>
          {/* <h1 class="profile-name">John Doe</h1> */}
        </div>

        <div className="profileInfo">
          <Link className="username" to="/">
            <h1>JasonNicholasSusanto5602</h1>
          </Link>

          <h3 className="name">
            <span>Jason </span>
            <span>Susanto</span>
          </h3>

          <p className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae tenetur blanditiis ipsum nesciunt esse, necessitatibus maxime quas quod praesentium laboriosam soluta repellendus vel, fuga tempora, porro dolor! Unde, quod velit!
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
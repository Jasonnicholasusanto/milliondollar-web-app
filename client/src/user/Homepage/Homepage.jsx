import React, { useState, useEffect, fetchUserData } from 'react';
import './Homepage.scss';
import useFetchUsers from '../../hooks/useFetchUsers';
import ItemCarousel from '../../components/ItemCarousel/ItemCarousel';
import { useParams } from 'react-router-dom';

const Homepage = () => {

  const { username } = useParams();

  const { data, loading, error } = useFetchUsers(`/users?populate=*&filters[username][$eq]=${username}`);

  const [firstName, setFirstName] = useState('Jason');
  const [lastName, setLastName] = useState('Susanto');
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae tenetur blanditiis ipsum nesciunt esse, necessitatibus maxime quas quod praesentium laboriosam soluta repellendus vel, fuga tempora, porro dolor! Unde, quod velit!')

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user</div>;
  }

  return (
    <div className="userHomepage">

      <div className="profile">

        <div class="profile-header">
          {data?.coverImg !== null 
            ? <img class="cover-image" src={process.env.REACT_APP_UPLOAD_URL + data?.coverImg?.url} alt="Cover Image"/>
            : <img class="cover-image" src="/img/cover-image-default.png"/>}
          <img class="profile-image" src={process.env.REACT_APP_UPLOAD_URL + data?.profileImg?.url} alt="Profile Image"/>
        </div>

        <div className="profileInfo">
          <h1>@{username}</h1>

          <h3 className="name">
            <span>{data?.firstName} </span>
            <span>{data?.lastName}</span>
          </h3>

          <p className="description">
            {data?.description}
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
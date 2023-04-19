import React, { useState, useEffect, fetchUserData } from 'react';
import './Dashboard.scss';
import useFetchUsers from '../../hooks/useFetchUsers';
import ItemCarousel from '../../components/ItemCarousel/ItemCarousel';
import { useParams } from 'react-router-dom';

const Dashboard = () => {

  const { username } = useParams();
  const { data, loading, error } = useFetchUsers(`/users?populate=*&filters[username][$eq]=${username}`);

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
            {data?.description !== null ? data?.description : "No description here."}
          </p>
        </div>

      </div>

      <div className="carousels">

          <ItemCarousel className='postersCarousel' username={data?.username} header={"Posters"} url={`/posters?populate=*&[filters][user][id]=${data?.id}`}/>

          <ItemCarousel className='digitalPlannersCarousel' username={data?.username} header={"Digital Planners"} url={`/digital-planners?populate=*&[filters][user][id]=${data?.id}`}/>

      </div>

    </div>
  )
}

export default Dashboard;
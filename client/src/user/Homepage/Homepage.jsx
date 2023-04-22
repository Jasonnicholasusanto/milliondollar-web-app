import React, { useState, useEffect, fetchUserData } from 'react';
import './Homepage.scss';
import useFetchUsers from '../../hooks/useFetchUsers';
import ItemCarousel from '../../components/ItemCarousel/ItemCarousel';
import { Link, useParams } from 'react-router-dom';
import Dropzone from "react-dropzone";

const handleDrop = async (acceptedFiles) => {
  const formData = new FormData();
  formData.append('file', acceptedFiles[0]);
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const Homepage = () => {

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

        <div className="profile-header">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {data?.coverImg !== null 
                  ? <img className="cover-image" src={process.env.REACT_APP_UPLOAD_URL + data?.coverImg?.url} alt="Cover Image"/>
                  : <img className="cover-image" src="/img/cover-image-default.png"/>}
              </div>
            )}
          </Dropzone>
          
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {data?.profileImg !== null 
                    ? <img className="profile-image" src={process.env.REACT_APP_UPLOAD_URL + data?.profileImg?.url} alt="Profile Image"/>
                    : <img className="profile-image" src="/img/profile-user.png"/>}
                </div>
            )}
          </Dropzone>
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

          <div className="buttons">
            <Link className="link" to={`/dashboard/${username}/profile`}>
              <button className="btn">Edit Profile Information</button>
            </Link>&nbsp;&nbsp;
            
            <Link className="link" to="/">
              <button className="btn">Edit Posters</button>
            </Link>&nbsp;&nbsp;

            <Link className="link" to="/">
              <button className="btn">Sell Posters</button>
            </Link>&nbsp;&nbsp;
          </div>
          
        </div>

      </div>

      <div className="carousels">

          <ItemCarousel className='postersCarousel' username={data?.username} header={"Posters"} url={`/posters?populate=*&[filters][user][id]=${data?.id}`}/>

          <ItemCarousel className='digitalPlannersCarousel' username={data?.username} header={"Digital Planners"} url={`/digital-planners?populate=*&[filters][user][id]=${data?.id}`}/>

      </div>

    </div>
  )
}

export default Homepage
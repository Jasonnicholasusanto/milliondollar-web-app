import React, { useState } from 'react';
import "./UserDPList.scss";
import DPCard from "../DPCard/DPCard.jsx";
import useFetch from '../../hooks/useFetch';

const UserDPList = ({ subCats, maxPrice, sort, userData }) => {

    let query = `/digital-planners?populate=*&[filters][user][id]=${userData?.id}&${subCats.map((item) => `&[filters][sub_categories][id][$eq]=${item}`)}&[filters][price][$lte]=${maxPrice}`;
    
    // if (categoryId) {
    //     query += `&[filters][poster_materials][id]=${categoryId}${subCats.map(
    //         (item) => `&[filters][sub_categories][id][$eq]=${item}`
    //     )}&[filters][price][$lte]=${maxPrice}`;
    // } else {
    //     query += `&${categoryId}${subCats.map(
    //         (item) => `&[filters][sub_categories][id][$eq]=${item}`
    //     )}&[filters][price][$lte]=${maxPrice}`;
    // }


    if (sort !== null) {
        query += `&sort=price:${sort}`;
    }

    const { data, loading, error } = useFetch(
        query
    );

    return (
        <div className="userDPList">
            {error ? "Oops! Something went wrong." : 
            (loading ? "loading..." : 
            (data?.length !== 0 ? (data?.map((item) => <DPCard item={item} key={item.id}/>)) :
                "No items found."
            ))} 
        </div>
    )
}

export default UserDPList; 
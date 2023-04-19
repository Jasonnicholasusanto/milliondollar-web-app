import React, { useState } from 'react';
import "./DPList.scss";
import useFetch from '../../hooks/useFetch';
import DPCard from '../DPCard/DPCard';

const DPList = ({ subCats, maxPrice, sort, categoryId }) => {

    let query = `/digital-planners?populate=*`;

    console.log(subCats);
    
    if (categoryId) {
        query += `&[filters][digital_planner_categories][id]=${categoryId}${subCats.map(
            (item) => `&[filters][digital_planner_subcategories][id][$eq]=${item}`
        )}&[filters][price][$lte]=${maxPrice}`;
    } else {
        query += `&${categoryId}${subCats.map(
            (item) => `&[filters][digital_planner_subcategories][id][$eq]=${item}`
        )}&[filters][price][$lte]=${maxPrice}`;
    }


    if (sort !== null) {
        query += `&sort=price:${sort}`;
    }

    const { data, loading, error } = useFetch(
        query
    );

    return (
        <div className="list">
            {error ? "Oops! Something went wrong." : 
            (loading ? "loading..." : 
            (data?.length !== 0 ? (data?.map((item) => <DPCard item={item} key={item.id}/>)) :
                "No items found."
            ))} 
        </div>
    )
}

export default DPList; 
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Contact from '../../components/Contact/Contact';
import List from '../../components/List/List';
import "./Products.scss";
import useFetch from '../../hooks/useFetch';

const Products = () => {

  // categoryId includes our string object id due to the react-router-dom
  const categoryId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState(null);

  const { data, loading, error } = useFetch(
    `/subcategories?[filters][categories][id][$eq]=${categoryId}`
  );

  return (

    <div className="productsContainer">
      <div className="products">
        <div className="left">

          <div className="filterItem">
            <h2>Poster Materials</h2>

            <div className="inputItem">
              <input type="checkbox" id="1" value={1}/>
              <label htmlFor="1">Classic Matte Paper</label>
            </div>

            <div className="inputItem">
              <input type="checkbox" id="2" value={2}/>
              <label htmlFor="2">Premium Matte Paper</label>
            </div>

            <div className="inputItem">
              <input type="checkbox" id="3" value={3}/>
              <label htmlFor="3">Classic Semi-glossy Paper</label>
            </div>

            <div className="inputItem">
              <input type="checkbox" id="4" value={4}/>
              <label htmlFor="4">Premium Semi-glossy Paper</label>
            </div>

          </div>

          <div className="filterItem">
            <h2>Filter by price</h2>
            <div className="inputItem">
              <span>$1</span>
              <input type="range" min={1} max={500} onChange={(e) => setMaxPrice(e.target.value)}/>
              <span>${maxPrice}</span>
            </div>
          </div>
          
          <div className="filterItem">
            <h2>Sort by</h2>
            <div className="inputItem">
              <input type="radio" id="asc" value="asc" name="price" onChange={e => setSort("asc")}/>
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>

            <div className="inputItem">
              <input type="radio" id="desc" value="desc" name="price" onChange={e => setSort("desc")}/>
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>

        <div className="right">
          <img 
            className='categoryImg' 
            src="https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt=""
          />

          <List categoryId={categoryId} maxPrice={maxPrice} sort={sort} />
        </div>
      </div>

      <Contact/>
    </div>
  )
}

export default Products
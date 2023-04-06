import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Contact from '../../components/Contact/Contact';
import List from '../../components/List/List';
import "./Products.scss";
import useFetch from '../../hooks/useFetch';
import PostersHeadline from '../../components/PostersHeadline/PostersHeadline';

const Products = () => {

  // categoryId includes our string object id due to the react-router-dom
  const categoryId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);


  const { data, loading, error } = useFetch(
    // `/sub-categories?filters[poster_materials][id][$eq]=${categoryId}`
    categoryId ? `/sub-categories?filters[poster_materials][id][$eq]=${categoryId}` : "/sub-categories"
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked 
        ? [...selectedSubCats, value] 
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  console.log(selectedSubCats);

  return (

    <div className="productsContainer">
      <div className="products">
        <div className="left">

          <div className="filterItem">
            <h2>Poster Categories</h2>

            {data?.map((item) => (
              <div className="inputItem" key={item.id}>
                <input type="checkbox" id={item.id} value={item.id} onChange={handleChange}/>
                <label htmlFor={item.id}>{item.attributes.title}</label>
              </div>
            ))}
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
              <input type="radio" id="asc" value="asc" name="price" onChange={(e) => setSort("asc")}/>
              <label htmlFor="asc">Price (Lowest first)</label>
            </div>

            <div className="inputItem">
              <input type="radio" id="desc" value="desc" name="price" onChange={(e) => setSort("desc")}/>
              <label htmlFor="desc">Price (Highest first)</label>
            </div>
          </div>
        </div>

        <div className="right">
          {/* <img 
            className='categoryImg' 
            src="https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt=""
          /> */}

          <PostersHeadline id={categoryId}/>

          <List categoryId={categoryId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
        </div>
      </div>

      <Contact/>
    </div>
  )
}

export default Products
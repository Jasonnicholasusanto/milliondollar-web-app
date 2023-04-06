import { React, useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link} from "react-router-dom";
import Cart from '../Cart/Cart';
import "./NavBar.scss";

const NavBar = () => {

    const [open, setOpen] = useState(false);

  return (
    <div className='navbar'>
        <div className="wrapper">

            <div className="left2">
                <Link className='millionDollarPostersLink' to="/">MillionDollarPosters</Link>
            </div>

            <div className="right">

                <div className="dropdownItem">
<<<<<<< HEAD
                    <Link className='dropbtn' to="/digital-planners/">Digital Planners</Link>

                    <div class="dropdown-content">
                        <a href="/digital-planners/1">Daily Planners</a>
                        <a href="/digital-planners/2">Monthly Planners</a>
                        <a href="/digital-planners/3">Yearly Planners</a>
                        <a href="/digital-planners/4">Habit Trackers</a>
                        <a href="/digital-planners/5">Others</a>
=======
                    <Link className='dropbtn' to="/posters/1">Digital Planners</Link>

                    <div class="dropdown-content">
                        <a href="#">Daily Planners</a>
                        <a href="#">Monthly Planners</a>
                        <a href="#">Yearly Planners</a>
                        <a href="#">Habit Trackers</a>
                        <a href="#">Others</a>
>>>>>>> d5627487886e2259953dbec9ce62359088a3b05b
                    </div>
                </div>

                <div className="dropdownItem">
                    <Link className='dropbtn' to="/posters/">Posters</Link>

                    <div class="dropdown-content">
                        <a href="/posters/1">Classic Matte Paper</a>
                        <a href="/posters/2">Premium Matte Paper</a>
                        <a href="/posters/3">Classic Semi-Glossy Paper</a>
                        <a href="/posters/4">Premium Semi-Glossy Paper</a>
                        <a href="/posters/5">Aluminium Prints</a>
                    </div>
                </div>

                <div className="item">
                    <Link className='link' to="/sign-in/">Sell</Link>
                </div>

                {/* <div className="item">
                    <Link className='link' to="/">Homepage</Link>
                </div> */}

                <div className="item">
                    <Link className='link' to="/about-us/">About</Link>
                </div>

                <div className="item">
                    <Link className='link' to="/contact-us/">Contact</Link>
                </div>
                
                <div className="icons">

                    <div className='searchIcon'>
                        <Link className="link" to="/">
                            <SearchIcon/>
                        </Link>
                    </div>

                    <div className='signInIcon'>
                        <Link className="link" to="/sign-in">
                            <PersonOutlineOutlinedIcon/>
                        </Link>
                    </div>
                    
                    <div className="favouriteIcon">
                        <FavoriteBorderOutlinedIcon className='favIcon'/>
                    </div>
                    
                    {/* <div className="cartIcon" onClick={changeVisibility}>
                        <ShoppingCartOutlinedIcon/>
                        <span>0</span>
                    </div> */}

                    <div className="cartIcon">
                        <Link className="link" to="/cart">
                            <ShoppingCartOutlinedIcon/>
                            <span>0</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {open && <Cart/>}
    </div>
  )
}

export default NavBar
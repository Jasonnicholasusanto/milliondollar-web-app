import React from 'react';
import './Footer2.scss';
import { Link } from 'react-router-dom';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const Footer2 = () => {
  return (
    <div className="footer2">
        <div className="container">
            <div className="row">
                <div className="footer-col">
                    <h4>About</h4>
                    <ul>
                        <li><a href="/about-us/">About Us</a></li>
                        <li><a href="/contact-us/">Contact Us</a></li>
                        <li><a href="/sign-in/">Sell My Designs</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Help</h4>
                    <ul>
                        <li><a href="/frequently-asked-questions/">FAQs</a></li>
                        <li><a href="/shipping-information/">Shipping</a></li>
                        <li><a href="/returns-policy/">Returns</a></li>
                        <li><a href="/order-status/">Order Status</a></li>
                        <li><a href="/payment-options/">Payment Options</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul>
                        <li><a href="/posters/">Posters</a></li>
                        <li><a href="/digital-planners/">Digital Planners</a></li>
                        {/* <li><a href=""></a></li> */}

                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Follow Us</h4>
                    
                    <div className="social-links">
                        <a target="_blank" href="https://www.instagram.com/milliondollarposters/"><InstagramIcon/></a>
                        <a href=""><FacebookIcon/></a>
                        <a href=""><TwitterIcon/></a>
                    </div>
                </div>
            </div>

            <div className="copyright">

                <Link className='link' to="/">
                    <h1>MillionDollarPosters</h1>
                </Link>

                <span>
                    © Copyright 2023. All Rights Reserved
                </span>
            </div>
        </div>
    </div>
  )
}

export default Footer2
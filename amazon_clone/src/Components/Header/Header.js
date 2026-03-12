import React, { useContext } from 'react'
import classes  from  "./Header.module.css"
import {Link} from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';



 function Header() {

 const[{basket}, dispatch] = useContext(DataContext)
  
  return (
    <>
      <section>
        <section className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                </Link>
                  
                  <div className={classes.delivery}>
                    <span>
                         <SlLocationPin />
                    </span>
                    <div>
                        <p>Delivered to</p>
                        <span>Ethiopia</span>
                    </div>
                  </div>
            </div>
            {/* search bar */}
            <div className={classes.search}>
                <select name=""id="">
                    <option value="">All</option>
                </select>
                <input type="text"  name="" id="" placeholder='Search Product' />
                <BsSearch size={25}/>
            </div>
            {/* other section */}
            <div className={classes.order_container}>
                {/* right side link */}
                <a href=""  className={classes.language}>
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"  alt="" />
                    <select name="" id="">
                        <option value="">EN</option>
                    </select>
                </a>
                {/* three components */}
                <a href=""> 
                        <p>Sign In</p>
                        <span>Account & Lists</span>
                </a>
                {/* order */}
                <Link to="/orders">
                     <p>returns</p>
                    <span>& orders</span>
                 </Link>
                {/* cart */}
                <Link to="/cart" className={classes.cart}>
                 <BiCart  size={35}/>
                 <span>{basket.length}</span>
                </Link>
            </div>

        </section>
      </section>
     <LowerHeader />
    </>
  )
}


export default Header;
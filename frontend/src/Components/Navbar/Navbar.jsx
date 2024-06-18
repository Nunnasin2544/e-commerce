import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu, setMenu] = useState("");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const [product, setProduct] = useState();
    const defaultProduct = () => {
      if(localStorage.getItem('Product') != 1){
        setProduct(1);
        localStorage.setItem('Product', 1);
      }
    }

    const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

    const parseURL = () => {
      const currentURL = window.location.href;
      const url = new URL(currentURL);

      return url.pathname;
    };
  
    React.useEffect(() => {
      const pathname = parseURL();
      if (pathname === '/') {
        setMenu("shop");
        defaultProduct();
      }
      else if (pathname === '/men') {
        setMenu("men");
        defaultProduct();
      }
      else if (pathname === '/women') {
        setMenu("women");
        defaultProduct();
      }
      else if (pathname === '/kids') {
        setMenu("kids");
        defaultProduct();
      }
      else if (pathname === '/login') {
        setMenu("");
        defaultProduct();
      }
      else if (pathname === '/cart') {
        setMenu("");
        defaultProduct();
      }
      else {
        setMenu("");
        // defaultProduct();
        if(localStorage.getItem('Product') == 1)
          localStorage.removeItem('Product');
      }
    }, []); 

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/'>Shop</Link> {menu === "shop"? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("men")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/men'>Men</Link> {menu === "men"? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("women")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/women'>Women</Link> {menu === "women"? <hr/> : <></>}</li>
        <li onClick={() => {setMenu("kids")}}><Link style={{textDecoration: 'none', color: '#626262'}} to='/kids'>Kids</Link> {menu === "kids"? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.clear();window.location.replace('/');}}>Logout</button>
        :<Link to='/login'><button onClick={() => {setMenu("")}}>Login</button></Link>}
        <Link to='/cart' onClick={() => {setMenu("")}}><img src={cart_icon} alt="" /></Link> 
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar

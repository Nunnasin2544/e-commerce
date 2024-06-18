import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    let {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

    // if(localStorage.getItem('Cart1') != null){
    //   const data1 = localStorage.getItem('Cart1');
    //   const data2 = localStorage.getItem('Cart2');
    //   if(data1 !== null) {
    //     all_product = JSON.parse(data1);
    //     cartItems = JSON.parse(data2);
    //   }
    // }
  
    // localStorage.setItem('Cart1', JSON.stringify(all_product));
    // localStorage.setItem('Cart2', JSON.stringify(cartItems));

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e, i) => {
        if(cartItems[e.id]>0)
        {
            return <div key={i}>
            <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon'/>
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>${e.new_price*cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} alt="" onClick={() => {removeFromCart(e.id)}} />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems

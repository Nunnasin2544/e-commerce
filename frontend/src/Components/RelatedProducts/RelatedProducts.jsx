import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'

const RelatedProducts = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularinwomen')
    .then((resp)=>resp.json())
    .then((data)=>setPopularProducts(data));
  },[])

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts

import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'

 function Product() {
    const [Products, setProducts] = useState([])
   const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
       axios.get('https://fakestoreapi.com/products')
       .then((res)=>{
          setProducts(res.data)
          setIsLoading(false)
       }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
       })
        
    }, [])



  return (
    <>
    {isLoading?(<Loader />) : (<section  className={classes.Products_container}>
      { Products.length > 0 ? (
        Products.map((singleProduct) => (
         singleProduct ? (
            <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
         ) : null ))
      ) : (
         <p> No products found.</p>
      )}
     </section>)
     
     }


    </>
  )
}




export default Product;
import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {

  
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { productID } = useParams()

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [productID])

  return (
    <LayOut>
      {isLoading ? (<Loader />) : (<ProductCard product={product} />) }
    </LayOut>
  )
}

export default ProductDetail
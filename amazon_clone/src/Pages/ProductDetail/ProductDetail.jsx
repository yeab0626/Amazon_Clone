import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard'

function ProductDetail() {

  const { productID } = useParams()
  console.log(productID);
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`${productUrl}/products/${productID}`)
      .then((res) => {
        console.log(res.data)
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [productID])

  return (
    <LayOut>
      {!product ? <h2>Loading...</h2> : <ProductCard product={product} />}
    </LayOut>
  )
}

export default ProductDetail
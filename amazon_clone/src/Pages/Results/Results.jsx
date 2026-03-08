import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Results.module.css'
import { useParams } from 'react-router-dom';
import axios  from 'axios'
import {productUrl} from '../../API/endPoints'
import ProductCard from '../../Components/Product/ProductCard';


 function Results() {
    const [results, setResults] = useState([]);
     const {categoryName} = useParams()
       
     const getApiCategory = (name) => {
        const map = {
            "electronics" : "electronics",
            "jewelery" : "jewelery",
            "men's-clothing": "men's clothing",
           "womens-clothing": "women's clothing" 
        };
        return map[name.toLowerCase()] || name;
     };
     

     useEffect(() => {
        const apiCategory = getApiCategory(categoryName);
        axios.get(`${productUrl}/products/category/${encodeURIComponent(apiCategory)}`)
         .then((res)=>{
         setResults(res.data)
        }).catch((error)=>
       console.log(error)
        )
     }, [categoryName])
     

  return (

    <LayOut>
        <section>
            <h1 style={{padding: "30px"}}>Results</h1>
            <p style={{padding: "30px"}}>category / {categoryName}</p>
            <hr/>
            <div className={classes.products_container}>
                {results?.map((product) => (
                    <ProductCard key={product.id}

                    product={product} />
                ))}
            </div>
        </section>
    </LayOut>
    
  )
}


export default Results;
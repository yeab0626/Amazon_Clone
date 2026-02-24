import React from 'react'
import classes from './Category.module.css'


 function CatagoryCard({data}){
  return (
    <div className={classes.category}>

        <a href="">
            <span>
                <h2>{data.title}</h2>
            </span>
            <img src={data.imageLink} alt={data.title} />
            <p>shop now </p>
        </a>
    </div>
  )
}


export default CatagoryCard;